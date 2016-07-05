var container = document.getElementById('embed-container');
var video = document.getElementById('video-container');
var ratio = 9/16; //this is why the 56.25% padding hack exists
var header = document.getElementById("header");

function resizer() {
    var width = parseInt(window.getComputedStyle(container)['width'], 10);
    var height = (width * ratio);
    
    video.style.width = width + 'px';
    video.style.height = height + 'px';
    video.style.marginTop = '-3.278%'; //~732px wide, the video border is about 24px thick (24/732)
    
    container.style.height = (height * 0.88) + 'px'; //0.88 was the magic number that you needed to shrink the height of the outer container with.
    header.style.lineHeight = (height * 0.88)+ "px";
}

//attach event on resize
window.addEventListener('resize', resizer, false);

//call function for initial sizing
//no need for padding hack since we are setting the height based off of the width * aspect ratio
resizer();