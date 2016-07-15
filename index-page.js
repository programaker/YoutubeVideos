(function IndexPage($, YoutubeVideos) {
    var youtube = YoutubeVideos($);

    youtube.fetchLatestVideoFromChannel('UCEWHPFNilsT0IfQfutVzsag', {
        success: renderVideoFn(youtube, $('#video-link'), $('#video-thumb'))
    }); 

    function renderVideoFn(youtube, videoLinkEl, videoThumbEl) {
        return function renderVideo(latestVideo) {
            videoLinkEl
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
            
            videoThumbEl.attr('src', latestVideo.videoThumbnailUrl);
        };
    }

}(window.jQuery, window.YoutubeVideos));