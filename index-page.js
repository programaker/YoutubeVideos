(function index_page_js() {
    
    var videoContainerEl = document.getElementById('video-container');
    YoutubeVideos.fetchLatestVideoFromChannel('UCkrhfwExfTZOmMY92cYkMIw', {success: renderVideo}); 

    function renderVideo(latestVideo) {
        var embedUrl = YoutubeVideos.videoEmbedUrl(latestVideo.videoId, {autoplay: 1});

        var embedEl = document.createElement('iframe');
        embedEl.frameborder = 0;
        embedEl.allowfullscreen = true;
        embedEl.src = embedUrl;
        
        videoContainerEl.appendChild(embedEl);
    }

}());