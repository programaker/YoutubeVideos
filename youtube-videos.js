(function youtubeVideosModule(global, $) {
    function videoUrl(videoId) {
        return 'http://www.youtube.com/embed/'+ videoId +'?autoplay=1';
    };

    function channelVideoSearchUrl(channelId, maxResults) {
        var key = 'AIzaSyDQOzdypbd04-ExD90xUVPoEG2Hfx7X3X8'; //parameterize key!

        var url = 'https://www.googleapis.com/youtube/v3/search'
            + '?key=' + key 
            + '&channelId=' + channelId 
            + '&maxResults=' + maxResults 
            + '&type=video' 
            + '&order=date'
            + '&part=snippet'
        ; 

        return url;
    };

    function fetchLatestVideoFromChannel(channelName, fn) {
        $.ajax({
            url: channelVideoSearchUrl(channelName, 1),
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