(function multiple_videos_page_js() {

    var domElements = {
        selectedVideoEl: document.getElementById('selected-video'),
        videoListEl: document.getElementById('video-list'),
        errorEl: document.getElementById('error'),
        fetchVideosEl: document.getElementById('fetch-videos'),
        channelIdEl: document.getElementById('channel-id'),
        videoAmountEl: document.getElementById('video-amount')
    };

    domElements.videoListEl.addEventListener('click', selectVideoFn(domElements.selectedVideoEl));
    
    domElements.fetchVideosEl.addEventListener('click', fetchVideosFn(domElements, {
        success: renderVideosFn(domElements.videoListEl), 
        error: renderErrorFn(domElements.errorEl)
    }));


    function fetchVideosFn(domElements, fns) {
        return function fetchVideos() {
            emptyElements(domElements.videoListEl, domElements.selectedVideoEl, domElements.errorEl);

            YoutubeVideos.fetchLastVideosFromChannel(
                domElements.channelIdEl.value, 
                parseInt(domElements.videoAmountEl.value), 
                fns); 
        };
    }

    function emptyElements(videoListEl, selectedVideoEl, errorEl) {
        videoListEl.textContent = '';
        selectedVideoEl.textContent = '';
        errorEl.textContent = '';
    }

    function renderVideosFn(videoListEl) {
        return function renderVideos(lastVideos) {
            for (var i = 0, l = lastVideos.length; i < l; i++) {
                var video = lastVideos[i];

                var videoThumbEl = document.createElement('img');
                videoThumbEl.src = video.videoThumbnailUrl;
                videoThumbEl.width = 180;
                videoThumbEl.height = 135;
                videoThumbEl.setAttribute('data-vid', video.videoId);

                var videoItemEl = document.createElement('li');
                videoItemEl.appendChild(videoThumbEl);

                videoListEl.appendChild(videoItemEl);
            }
        };
    }

    function renderErrorFn(errorEl) {
        return function renderError(error) {
            errorEl.innerText = error.message;
        };
    }

    function selectVideoFn(selectedVideoEl) {
        return function selectVideo(e) {
            if (e.target.tagName !== 'IMG') {
                return;
            }

            var embedEls = selectedVideoEl.getElementsByTagName('iframe');
            var embedEl = embedEls.length && embedEls[0];
            
            if (!embedEl) {
                embedEl = document.createElement('iframe');
                embedEl.frameborder = 0;
                embedEl.allowfullscreen = true;
                selectedVideoEl.appendChild(embedEl);
            }

            var videoId = e.target.getAttribute('data-vid');
            embedEl.src = YoutubeVideos.videoEmbedUrl(videoId);
        };
    }

}());
