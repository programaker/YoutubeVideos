(function youtube_videos_js() {
    window.YoutubeVideos = {
        fetchLatestVideoFromChannel: fetchLatestVideoFromChannel,
        fetchLastVideosFromChannel: fetchLastVideosFromChannel,
        videoEmbedUrl: videoEmbedUrl
    };    


    function fetchLatestVideoFromChannel(channelId, fns) {
        fetchLastVideosFromChannel(channelId, 1, {
            success: singleVideoResponseFn(fns.success),
            error: fns.error
        });
    }

    function singleVideoResponseFn(fn) {
        return function singleVideoResponse(videos) { 
            fn(videos[0]); 
        };
    }

    function fetchLastVideosFromChannel(channelId, amount, fns) {
        var callbackName = 'fetchLastVideosFromChannel_' + (+ new Date());
        var url = channelVideoSearchUrl(channelId, amount, callbackName); 
        window[callbackName] = fetchVideoSuccessFn(callbackName, fns);

        var scriptEl = document.createElement('script');
        scriptEl.setAttribute('id', callbackName);
        scriptEl.setAttribute('src', url);
        document.body.appendChild(scriptEl);
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

    function channelVideoSearchUrl(channelId, maxResults, callbackName) {
        return 'https://www.googleapis.com/youtube/v3/search' +
            '?key=AIzaSyDQOzdypbd04-ExD90xUVPoEG2Hfx7X3X8' +
            '&type=video' +
            '&order=date' +
            '&part=snippet' +
            '&channelId=' + channelId +
            '&maxResults=' + maxResults +
            '&callback=' + callbackName; 
    }

    function fetchVideoSuccessFn(callbackName, fns) {
        return function handleSuccess(response) {
            //jsonp clean up
            delete window[callbackName];
            document.getElementById(callbackName).parentNode.removeChild(document.getElementById(callbackName));

            if (response.error && fns.error) {
                fns.error({message: response.error.message});
            }
            else if (response.items && response.items.length) {
                fns.success(response.items.map(youtubeVideoToOurVideo));
            }
            else {
                fns.success([]);
            }
        };
    }

    function fetchVideoErrorFn(errorFn) {
        return function handleError(jqXHR, textStatus, errorThrown) {
            if (errorFn) {
                errorFn({message: errorThrown});
            }
        };
    }

    function youtubeVideoToOurVideo(youtubeVideo) {
        return {
            videoId: youtubeVideo.id.videoId,
            videoThumbnailUrl: youtubeVideo.snippet.thumbnails.high.url
        };
    }
}());
