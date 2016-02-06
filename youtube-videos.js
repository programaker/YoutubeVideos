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
        fetchLastVideosFromChannel: fetchLastVideosFromChannel
    };    


    //private implementation details after

    function fetchLatestVideoFromChannel(channelId, fn) {
        fetchLastVideosFromChannel(channelId, 1, function singleVideoResponse(videos) {
            fn(videos[0]);
        });
    }

    function fetchLastVideosFromChannel(channelId, ammount, fn) {
        $.ajax({
            url: channelVideoSearchUrl(channelId, ammount),
            dataType: 'jsonp',
            jsonp: 'callback',
            success: fetchVideoSuccessFn(fn)
        });
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
                var videos = response.items.map(function toDomainVideo(video) {
                    var videoId = video.id.videoId;
                    var videoThumbnailUrl = video.snippet.thumbnails.high.url;
                    return {videoUrl: videoUrl(videoId), videoThumbnailUrl: videoThumbnailUrl};
                });
                
                return fn(videos);
            }

            return fn([]);
        };
    }

    function videoUrl(videoId) {
        return 'http://www.youtube.com/embed/'+ videoId +'?autoplay=1';
    }

//explicit module dependencies
//prefixing with 'window.' just to avoid annoying JsHint warnings
}(window.jQuery));
