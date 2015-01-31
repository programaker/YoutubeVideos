(function indexPageModule(public, $) {
    var YoutubeVideos = public.YoutubeVideos;
    var videoLink = $('#video-link');
    var videoThumb = $('#video-thumb');
    
    function renderVideo(latestVideo) {
        YoutubeVideos.displayInLightbox(videoLink, {
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
        
        videoLink.attr('href', latestVideo.videoUrl);
        videoThumb.attr('src', latestVideo.videoThumbnailUrl);
    };

    YoutubeVideos.fetchLatestFromChannel('portadosfundos', renderVideo);
}(window, jQuery));