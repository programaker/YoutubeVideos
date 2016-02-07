(function indexPageModule($, YoutubeVideos) {
    'use strict';

    //"Porta dos Fundos" channel
    YoutubeVideos.fetchLatestVideoFromChannel('UCEWHPFNilsT0IfQfutVzsag', {
        success: renderVideoFn($('#video-link'), $('#video-thumb'))
    }); 

    function renderVideoFn(videoLinkEl, videoThumbEl) {
        return function renderVideo(latestVideo) {
            videoLinkEl
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
            
            videoThumbEl.attr('src', latestVideo.videoThumbnailUrl);
        };
    }

}(window.jQuery, window.YoutubeVideos));