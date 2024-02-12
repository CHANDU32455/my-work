document.addEventListener("DOMContentLoaded", function() {
    var videos = document.querySelectorAll("video");
    console.log("Found videos:", videos.length); // Debugging
    
    videos.forEach(function(video) {
        video.addEventListener("play", function() {
            console.log("Video playing:", video.src); // Debugging
            pauseOtherVideos(video);
        });
    });

    function pauseOtherVideos(currentVideo) {
        videos.forEach(function(video) {
            if (video !== currentVideo && !video.paused) {
                console.log("Pausing video:", video.src); // Debugging
                video.pause();
            }
        });
    }
});
