(function indexPageModule(public, $) {
    var YoutubeVideos = public.YoutubeVideos;
    var videoLink = $('#video-link');
    var videoThumb = $('#video-thumb');

    function renderVideo(latestVideo) {
        var fancyboxConfig = {
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
        };

        videoLink
            .attr('href', latestVideo.videoUrl)
            .addClass('fancybox.iframe')
            .fancybox(fancyboxConfig);
        
        videoThumb.attr('src', latestVideo.videoThumbnailUrl);
    };

    YoutubeVideos.fetchLatestFromChannel('scishowspace', renderVideo);
}(window, jQuery));