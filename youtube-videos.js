(function youtubeVideosModule(global, $) {
    function videoUrl(videoId) {
        return 'http://www.youtube.com/embed/'+ videoId +'?autoplay=1';
    };

    function channelVideoSearchUrl(channelId, maxResults) {
        var url = 'https://www.googleapis.com/youtube/v3/search'
            + '?key=AIzaSyDQOzdypbd04-ExD90xUVPoEG2Hfx7X3X8'
            + '&type=video' 
            + '&order=date'
            + '&part=snippet'
            + '&channelId=' + channelId 
            + '&maxResults=' + maxResults 
        ; 

        return url;
    };

    function fetchLatestVideoFromChannel(channelId, fn) {
        $.ajax({
            url: channelVideoSearchUrl(channelId, 1),
            dataType: 'jsonp',
            jsonp: 'callback',
            success: fetchVideoSuccessFn(fn)
        });
    };

    function fetchVideoSuccessFn(fn) {
        return function fetchLatestVideo(response) {
            if (response && response.items && response.items.length) {
                var video = response.items[0];
                var videoId = video.id.videoId;
                var videoThumbnailUrl = video.snippet.thumbnails.high.url;
                return fn({videoUrl: videoUrl(videoId), videoThumbnailUrl: videoThumbnailUrl, error: ''});
            }

            return fn({videoUrl: '', videoThumbnailUrl: '', error: 'No response'});
        };
    };

    global.YoutubeVideos = {
        fetchLatestFromChannel: fetchLatestVideoFromChannel
    };
}(window, jQuery));