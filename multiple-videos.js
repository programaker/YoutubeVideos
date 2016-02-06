(function multipleVideosPageModule($, YoutubeVideos) {
    'use strict';

    //"Kurzgesagt – In a Nutshell" channel
    YoutubeVideos.fetchLastVideosFromChannel('UCsXVk37bltHxD1rDPwtNM8Q', 4, 
        renderVideosFn($('#video-list'), $('#selected-video'))); 

    function renderVideosFn(videoList, selectedVideo) {
        return function renderVideos(lastVideos) {
            for (var i = 0, l = lastVideos.length; i < l; i++) {
                var video = lastVideos[i];

                var videoThumb = $('<img/>', {
                    src: video.videoThumbnailUrl,
                    width: 180,
                    height: 135 
                });

                var videoItem = $('<li/>')
                    .on('click', selectVideoFn(video, selectedVideo))
                    .append(videoThumb);
                
                videoList.append(videoItem);
            }
        };
    }

    function selectVideoFn(video, selectedVideo) {
        return function selectVideo() {
            var embed = $('<iframe>', {
                src: video.videoUrl,
                width: 560, 
                height: 315,
                frameborder: 0,
                allowfullscreen: true
            });

            selectedVideo.empty().append(embed);
        };
    }

}(window.jQuery, window.YoutubeVideos));