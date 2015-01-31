(function indexPageModule(public, $) {
    var YouTubeVideos = public.YouTubeVideos;
    var videoLink = $('#video-link');
    var videoThumb = $('#video-thumb');

    function renderVideo(latestVideo) {
        videoLink.attr('href', latestVideo.videoUrl);
        videoThumb.attr('src', latestVideo.videoThumbnailUrl);
    };

    YouTubeVideos.displayInLightbox(videoLink, {
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

    YouTubeVideos.fetchLatestFromChannel('portadosfundos', renderVideo);
}(window, jQuery));