(function youtubeLatestVideoModule(public, $) {
    function videoUrl(videoId) {
        return 'http://www.youtube.com/embed/'+ videoId +'?autoplay=1';
    };

    function videoThumbNailUrl(videoId) {
        return 'http://img.youtube.com/vi/'+ videoId +'/hqdefault.jpg';
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

    function displayLatestVideoInFancybox(target, config) {
        target.fancybox(config);
    };

    public.YouTubeLatestVideo = {
        fetchFn: fetchLatestVideoFn,
        displayInLightbox: displayLatestVideoInFancybox
    };
}(window, jQuery));