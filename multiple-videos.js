(function multipleVideosPageModule($, YoutubeVideos) {
    'use strict';

    var selectedVideoEl = $('#selected-video');

    var videoListEl = $('#video-list').on('click', 'li', 
        selectVideoFn(selectedVideoEl));
    
    $('#fetch-videos').on('click', 
        fetchVideosFn($('#channel-id'), $('#video-amount'), 
            renderVideosFn(videoListEl, selectedVideoEl)));


    function fetchVideosFn(channelIdEl, videoAmountEl, fn) {
        return function fetchVideos() {
            YoutubeVideos.fetchLastVideosFromChannel(
                channelIdEl.val(), 
                parseInt(videoAmountEl.val()), 
                fn); 
        };
    }

    function renderVideosFn(videoListEl, selectedVideoEl) {
        return function renderVideos(lastVideos) {
            videoListEl.empty();
            selectedVideoEl.empty();

            for (var i = 0, l = lastVideos.length; i < l; i++) {
                var video = lastVideos[i];

                var videoThumbEl = $('<img/>', {
                    src: video.videoThumbnailUrl,
                    width: 180,
                    height: 135 
                });

                var videoItemEl = $('<li/>', {'data-vid': video.videoId}).append(videoThumbEl);
                videoListEl.append(videoItemEl);
            }
        };
    }

    function selectVideoFn(selectedVideoEl) {
        return function selectVideo(e) {
            var embedEl = selectedVideoEl.find('iframe');

            if (!embedEl.length) {
                embedEl = $('<iframe>', {
                    frameborder: 0,
                    allowfullscreen: true
                });

                selectedVideoEl.append(embedEl);
            }

            var videoId = e.currentTarget.getAttribute('data-vid');
            embedEl.attr('src', YoutubeVideos.videoEmbedUrl(videoId));
        };
    }

}(window.jQuery, window.YoutubeVideos));
