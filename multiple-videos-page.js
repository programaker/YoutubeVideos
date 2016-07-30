(function multiple_videos_page_js() {
    var domElements = {
        selectedVideoEl: $('#selected-video'),
        videoListEl: $('#video-list'),
        errorEl: $('#error'),
        fetchVideosEl: $('#fetch-videos'),
        channelIdEl: $('#channel-id'),
        videoAmountEl: $('#video-amount')
    };

    domElements.videoListEl.on('click', 'li', selectVideoFn(domElements.selectedVideoEl));
    
    domElements.fetchVideosEl.on('click', fetchVideosFn(domElements, {
        success: renderVideosFn(domElements.videoListEl), 
        error: renderErrorFn(domElements.errorEl)
    }));


    function fetchVideosFn(domElements, fns) {
        var channelIdEl = domElements.channelIdEl;
        var videoAmountEl = domElements.videoAmountEl;
        var videoListEl = domElements.videoListEl;
        var selectedVideoEl = domElements.selectedVideoEl;
        var errorEl = domElements.errorEl;

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
}());
