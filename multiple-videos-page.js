(function multiple_videos_page_js() {

    var selectedVideoEl = document.getElementById('selected-video');
    var videoListEl = document.getElementById('video-list');
    var errorEl = document.getElementById('error');
    var fetchVideosEl = document.getElementById('fetch-videos');
    var channelIdEl = document.getElementById('channel-id');
    var videoAmountEl = document.getElementById('video-amount');

    fetchVideosEl.addEventListener('click', fetchVideos);
    videoListEl.addEventListener('click', selectVideo);

    function fetchVideos() {
        emptyElements(videoListEl, selectedVideoEl, errorEl);

        var fns = {
            success: renderVideos, 
            error: renderError
        };

        YoutubeVideos.fetchLastVideosFromChannel(
            channelIdEl.value, 
            parseInt(videoAmountEl.value), 
            fns); 
    }

    function selectVideo(e) {
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
    }

    function emptyElements(videoListEl, selectedVideoEl, errorEl) {
        videoListEl.textContent = '';
        selectedVideoEl.textContent = '';
        errorEl.textContent = '';
    }

    function renderVideos(lastVideos) {
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
    }

    function renderError(error) {
        errorEl.innerText = error.message;
    }

}());
