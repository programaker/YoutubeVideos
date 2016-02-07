(function multipleVideosPageModule($, YoutubeVideos) {
    'use strict';

    var selectedVideoEl = $('#selected-video');
    var videoListEl = $('#video-list').on('click', 'li', selectVideoFn(selectedVideoEl));
    var errorEl = $('#error');
    
    $('#fetch-videos').on('click', fetchVideosFn(
        $('#channel-id'), 
        $('#video-amount'), 
        videoListEl, 
        selectedVideoEl, 
        errorEl, 
        {success: renderVideosFn(videoListEl), error: renderErrorFn(errorEl)}
    ));


    function fetchVideosFn(channelIdEl, videoAmountEl, videoListEl, selectedVideoEl, errorEl, fns) {
        return function fetchVideos() {
            emptyElements(videoListEl, selectedVideoEl, errorEl);

            YoutubeVideos.fetchLastVideosFromChannel(
                channelIdEl.val(), 
                parseInt(videoAmountEl.val()), 
                fns); 
        };
    }

    function emptyElements(videoListEl, selectedVideoEl, errorEl) {
        videoListEl.empty();
        selectedVideoEl.empty();
        errorEl.empty();
    }

    function renderVideosFn(videoListEl) {
        return function renderVideos(lastVideos) {
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

    function renderErrorFn(errorEl) {
        return function renderError(error) {
            errorEl.text(error.message);
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
