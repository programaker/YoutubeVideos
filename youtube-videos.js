(function youtubeVideosModule(public, $) {
    function videoUrl(videoId) {
        return 'http://www.youtube.com/embed/'+ videoId +'?autoplay=1';
    };

    function videoThumbNailUrl(videoId) {
        return 'http://img.youtube.com/vi/'+ videoId +'/hqdefault.jpg';
    };

    function channelVideoFeedUrl(channelName, maxResults) {
        return 'https://gdata.youtube.com/feeds/api/users/portadosfundos/uploads?max-results='+ maxResults +'&orderby=published&v=2&alt=jsonc';
    };

    function displayVideoInFancybox(target, config) {
        target.addClass('fancybox.iframe');
        target.fancybox(config);
    };

    function fetchLatestVideoFromChannel(channelName, fn) {
        $.ajax({
            url: channelVideoFeedUrl(channelName, 1),
            dataType: 'jsonp',
            jsonp: 'callback',
            success: fetchVideoSuccessFn(fn)
        });
    };

    function fetchVideoSuccessFn(fn) {
        return function fetchLatestVideo(response) {
            if (response.data && response.data.items) {
                var items = response.data.items;

                if (items.length) {
                    var videoId = items[0].id;
                    return fn({videoUrl: videoUrl(videoId), videoThumbnailUrl: videoThumbNailUrl(videoId), error: ''});
                }
            }

            return fn({videoUrl: '', videoThumbnailUrl: '', error: 'No response'});
        };
    };


    public.YouTubeVideos = {
        displayInLightbox: displayVideoInFancybox,
        fetchLatestFromChannel: fetchLatestVideoFromChannel
    };
}(window, jQuery));