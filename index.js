(function indexPageModule($, YoutubeVideos) {
    'use strict';

    //"Porta dos Fundos" channel
    YoutubeVideos.fetchLatestFromChannel('UCEWHPFNilsT0IfQfutVzsag', renderVideoFn($('#video-link'), $('#video-thumb'))); 

    function renderVideoFn(videoLink, videoThumb) {
        return function renderVideo(latestVideo) {
            videoLink
                .attr('href', latestVideo.videoUrl)
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
            
            videoThumb.attr('src', latestVideo.videoThumbnailUrl);
        };
    }

}(window.jQuery, window.YoutubeVideos));