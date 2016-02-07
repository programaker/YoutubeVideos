(function multipleVideosPageModule($, YoutubeVideos) {
    'use strict';

    //"Kurzgesagt – In a Nutshell" channel
    YoutubeVideos.fetchLastVideosFromChannel('UCsXVk37bltHxD1rDPwtNM8Q', 6, 
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

                var videoItem = $('<li/>', {'data-vid': video.videoId}).append(videoThumb);
                videoList.append(videoItem);
            }

            videoList.on('click', 'li', selectVideoFn(selectedVideo));
        };
    }

    function selectVideoFn(selectedVideo) {
        return function selectVideo(e) {
            var embed = selectedVideo.find('iframe');

            if (!embed.length) {
                embed = $('<iframe>', {
                    frameborder: 0,
                    allowfullscreen: true
                });

                selectedVideo.append(embed);
            }

            var videoId = e.currentTarget.getAttribute('data-vid');
            embed.attr('src', YoutubeVideos.videoEmbedUrl(videoId));
        };
    }

}(window.jQuery, window.YoutubeVideos));