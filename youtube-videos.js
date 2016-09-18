(function youtube_videos_js() {
    window.YoutubeVideos = {
        fetchLatestVideoFromChannel: fetchLatestVideoFromChannel,
        fetchLastVideosFromChannel: fetchLastVideosFromChannel,
        videoEmbedUrl: videoEmbedUrl
    };    


    function fetchLatestVideoFromChannel(channelId, fns) {
        fetchLastVideosFromChannel(channelId, 1, {
            success: singleVideoResponse.bind(null, fns.success),
            error: fns.error
        });
    }

    function singleVideoResponse(fn, videos) {
        fn(videos[0]); 
    }

    function fetchLastVideosFromChannel(channelId, amount, fns) {
        $.ajax({
            url: channelVideoSearchUrl(channelId, amount),
            dataType: 'jsonp',
            jsonp: 'callback',
            success: fetchVideoSuccess.bind(null, fns),
            error: fetchVideoError.bind(null, fns.error)
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

    function fetchVideoSuccess(fns, response) {
        if (response.error && fns.error) {
            fns.error({message: response.error.message});
        }
        else if (response.items && response.items.length) {
            fns.success(response.items.map(youtubeVideoToOurVideo));
        }
        else {
            fns.success([]);
        }
    }

    function fetchVideoError(errorFn, jqXHR, textStatus, errorThrown) {
        errorFn && errorFn({message: errorThrown});
    }

    function youtubeVideoToOurVideo(youtubeVideo) {
        return {
            videoId: youtubeVideo.id.videoId,
            videoThumbnailUrl: youtubeVideo.snippet.thumbnails.high.url
        };
    }
}());
