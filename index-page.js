(function index_page_js() {
    var domElements = {
        videoLink: $('#video-link'),
        videoThumb: $('#video-thumb')
    }

    YoutubeVideos.fetchLatestVideoFromChannel('UCEWHPFNilsT0IfQfutVzsag', {
        success: renderVideo.bind(null, domElements)
    }); 

    function renderVideo(domElements, latestVideo) {
        domElements.videoLink
            .attr('href', YoutubeVideos.videoEmbedUrl(latestVideo.videoId, {autoplay: 1}))
            .addClass('fancybox.iframe')
            .fancybox({
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
        
        domElements.videoThumb.attr('src', latestVideo.videoThumbnailUrl);
    }
}());