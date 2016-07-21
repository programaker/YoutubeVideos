(function IndexPage() {
    var youtube = YoutubeVideos();

    var domElements = {
        videoLink: $('#video-link'),
        videoThumb: $('#video-thumb')
    }

    youtube.fetchLatestVideoFromChannel('UCEWHPFNilsT0IfQfutVzsag', {
        success: renderVideoFn(youtube, domElements)
    }); 

    function renderVideoFn(youtube, domElements) {
        return function renderVideo(latestVideo) {
            domElements.videoLink
                .attr('href', youtube.videoEmbedUrl(latestVideo.videoId, {autoplay: 1}))
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
        };
    }
}());