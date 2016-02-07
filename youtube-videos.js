//closure that make possible: 
//-> private functions|state|objects|etc
//-> local 'use strict' directive
//-> turning module dependencies explicit
//
//a negative point: it's a function with side effects (changes window state)
//but, since it's just a self-executing function that will not be available
//after module setup, it seems ok... it works like a 'scope', not a true function 
(function youtubeVideosModule($) {
    'use strict';

    //high-level module definition first 
    //it's the module's public interface (Revealing Module pattern)
    //available globally through 'window'
    
    window.YoutubeVideos = {
        fetchLatestVideoFromChannel: fetchLatestVideoFromChannel,
        fetchLastVideosFromChannel: fetchLastVideosFromChannel,
        videoEmbedUrl: videoEmbedUrl
    };    


    //private implementation details after

    function fetchLatestVideoFromChannel(channelId, fn) {
        fetchLastVideosFromChannel(channelId, 1, singleVideoResponseFn(fn));
    }

    function singleVideoResponseFn(fn) {
        return function singleVideoResponse(videos) { 
            fn(videos[0]); 
        };
    }

    function fetchLastVideosFromChannel(channelId, amount, fn) {
        $.ajax({
            url: channelVideoSearchUrl(channelId, amount),
            dataType: 'jsonp',
            jsonp: 'callback',
            success: fetchVideoSuccessFn(fn)
        });
    }

    function videoEmbedUrl(videoId, options) {
        var embedUrl = 'http://www.youtube.com/embed/'+ videoId;

        if (options) {
            var urlParams = [];
            
            for (var propertyName in options) {
                urlParams.push(propertyName + '=' + options[propertyName]);
            }

            return embedUrl + '?' + urlParams.join('&');
        }

        return embedUrl;
    }

    function channelVideoSearchUrl(channelId, maxResults) {
        return 'https://www.googleapis.com/youtube/v3/search' +
            '?key=AIzaSyDQOzdypbd04-ExD90xUVPoEG2Hfx7X3X8' +
            '&type=video' +
            '&order=date' +
            '&part=snippet' +
            '&channelId=' + channelId +
            '&maxResults=' + maxResults; 
    }

    function fetchVideoSuccessFn(fn) {
        return function fetchLatestVideo(response) {
            if (response && response.items && response.items.length) {
                return fn(response.items.map(youtubeVideoToOurVideo));
            }

            return fn([]);
        };
    }

    function youtubeVideoToOurVideo(youtubeVideo) {
        return {
            videoId: youtubeVideo.id.videoId,
            videoThumbnailUrl: youtubeVideo.snippet.thumbnails.high.url
        };
    }

//explicit module dependencies
//prefixing with 'window.' just to avoid annoying JsHint warnings
}(window.jQuery));
