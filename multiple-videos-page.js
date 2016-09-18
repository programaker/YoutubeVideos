(function multiple_videos_page_js() {
    var domElements = {
        selectedVideoEl: $('#selected-video'),
        videoListEl: $('#video-list'),
        errorEl: $('#error'),
        fetchVideosEl: $('#fetch-videos'),
        channelIdEl: $('#channel-id'),
        videoAmountEl: $('#video-amount')
    };

    domElements.videoListEl.on('click', 'li', selectVideo.bind(null, domElements.selectedVideoEl));
    
    domElements.fetchVideosEl.on('click', fetchVideos.bind(null, domElements, {
        success: renderVideos.bind(null, domElements.videoListEl), 
        error: renderError.bind(null, domElements.errorEl)
    }));


    function fetchVideos(domElements, fns) {
        var channelIdEl = domElements.channelIdEl;
        var videoAmountEl = domElements.videoAmountEl;
        var videoListEl = domElements.videoListEl;
        var selectedVideoEl = domElements.selectedVideoEl;
        var errorEl = domElements.errorEl;

        emptyElements(videoListEl, selectedVideoEl, errorEl);

        YoutubeVideos.fetchLastVideosFromChannel(
            channelIdEl.val(), 
            parseInt(videoAmountEl.val()), 
            fns);
    }

    function emptyElements(videoListEl, selectedVideoEl, errorEl) {
        videoListEl.empty();
        selectedVideoEl.empty();
        errorEl.empty();
    }

    function renderVideos(videoListEl, lastVideos) {
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
    }

    function renderError(errorEl, error) {
        errorEl.text(error.message);
    }

    function selectVideo(selectedVideoEl, e) {
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
    }
}());
