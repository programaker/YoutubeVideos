(function multipleVideosPageModule($, YoutubeVideos) {
    'use strict';

    var videoListEl = $('#video-list').on('click', 'li', 
        selectVideoFn($('#selected-video')));
    
    $('#fetch-videos').on('click', 
        fetchVideosFn($('#channel-id'), $('#video-amount'), renderVideosFn(videoListEl)));


    function fetchVideosFn(channelIdEl, videoAmountEl, fn) {
        return function fetchVideos() {
            YoutubeVideos.fetchLastVideosFromChannel(
                channelIdEl.val(), 
                parseInt(videoAmountEl.val()), 
                fn); 
        };
    }

    function renderVideosFn(videoListEl) {
        return function renderVideos(lastVideos) {
            videoListEl.empty();

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
