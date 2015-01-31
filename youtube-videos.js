(function youtubeVideosModule(public, $) {
    function videoUrl(videoId) {
        return 'http://www.youtube.com/embed/'+ videoId +'?autoplay=1';
    };

    function videoThumbNailUrl(videoId) {
        return 'http://img.youtube.com/vi/'+ videoId +'/hqdefault.jpg';
    };

    function channelVideoFeedUrl(channelName) {
        return 'https://gdata.youtube.com/feeds/api/users/portadosfundos/uploads?max-results=1&orderby=published&v=2&alt=jsonc';
    };

    function displayVideoInFancybox(target, config) {
        target.fancybox(config);
    };

    function fetchLatestFromChannel(channelName, fn) {
        $.ajax({
            url: channelVideoFeedUrl(channelName),
            dataType: 'jsonp',
            jsonp: 'callback',
            success: fetchLatestVideoFn(fn)
        });
    };

    function fetchLatestVideoFn(fn) {
        return function fetchLatestVideo(response) {
            if (response.data && response.data.items) {
                var items = response.data.items;

                if (items.length) {
                    var lastVideo = items[0];
                    var videoId = lastVideo.id;
                    return fn({videoUrl: videoUrl(videoId), videoThumbnailUrl: videoThumbNailUrl(videoId), error: ''});
                }
            }

            return fn({videoUrl: '', videoThumbnailUrl: '', error: 'No response'});
        };
    };


    public.YouTubeVideos = {
        displayInLightbox: displayVideoInFancybox,
        fetchLatestFromChannel: fetchLatestFromChannel
    };
}(window, jQuery));