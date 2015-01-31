(function indexPageModule(public, $) {
    var YouTubeLatestVideo = public.YouTubeLatestVideo;
    var videoLink = $('#video-link');
    var videoThumb = $('#video-thumb');

    function renderLatestVideo(latestVideo) {
        videoLink.attr('href', latestVideo.videoUrl);
        videoThumb.attr('src', latestVideo.videoThumbnailUrl);
    };

    YouTubeLatestVideo.displayInLightbox(videoLink, {
        closeBtn: false,
        padding: 0,
        maxWidth: 800,
        maxHeight: 600,
        fitToView: false,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });

    YouTubeLatestVideo.fetch('portadosfundos', renderLatestVideo);
}(window, jQuery));