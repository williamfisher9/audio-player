const audioController = document.getElementById("audio-controller");
const lowVolumeIconBox = document.querySelector(".low-volume-icon-box");
const playPauseIconBox = document.querySelector(".play-pause-icon-box");

const start = document.querySelector(".start");
const end = document.querySelector(".end");

const root = document.querySelector(":root");

const looper = document.querySelector(".fa-arrow-rotate-right");


const progressBar = document.querySelector(".progress-control");
const higherVolume = document.querySelector(".fa-volume-high");
const volumeBar = document.querySelector(".volume-bar");

looper.addEventListener("click", () => {
    audioController.loop = !audioController.loop;
    if(audioController.loop) {
        looper.style.color = "green";
    } else {
        looper.style.color = "black";
    }
})

window.addEventListener("load", () => {
    lowVolumeIconBox.innerHTML = "<i name='low-volume' class='fa-solid fa-volume-low'></i>";
    audioController.volume = 0.5;
    playPauseIconBox.innerHTML = "<i name='play-btn' class='fa-solid fa-play'></i>";

    root.style.setProperty("--volume-width", parseFloat(audioController.volume)*100 + '%');
});




audioController.addEventListener("timeupdate", () => {
    start.textContent = `${Math.floor(audioController.currentTime/60).toString().padStart(2, '0')}:${Math.floor(60 * (audioController.currentTime/60 - Math.floor(audioController.currentTime/60))).toString().padStart(2, '0')}`;
    root.style.setProperty("--progress-bar-width", Math.floor(audioController.currentTime / audioController.duration*100) + '%');
})

audioController.addEventListener("ended", () => {
    playPauseIconBox.innerHTML = "<i name='play-btn' class='fa-solid fa-play'></i>";
})

progressBar.addEventListener("mousedown", (event) => {
    audioController.currentTime = (event.offsetX/progressBar.getBoundingClientRect().width) * audioController.duration;
})

volumeBar.addEventListener("mousedown", (event) => {
    audioController.volume = (event.offsetX/volumeBar.getBoundingClientRect().width).toFixed(1);
    root.style.setProperty("--volume-width", parseFloat((event.offsetX/volumeBar.getBoundingClientRect().width).toFixed(1))*100 + '%');
})

playPauseIconBox.addEventListener("click", (event) => {
    if(event.target.attributes.name.value == 'play-btn'){
        audioController.play();
        playPauseIconBox.innerHTML = "<i name='pause-btn' class='fa-solid fa-pause'></i>";
    
        if(start.textContent == '') start.textContent =  '00:00'
    
        end.textContent = `${Math.floor(audioController.duration/60).toString().padStart(2, '0')}:${Math.floor(60 * (audioController.duration/60 - Math.floor(audioController.duration/60))).toString().padStart(2, '0')}`;
    } else {
        audioController.pause();
        playPauseIconBox.innerHTML = "<i name='play-btn' class='fa-solid fa-play'></i>";
    }
})

higherVolume.addEventListener("click", () => {
    if(audioController.volume <= 0.9)
        audioController.volume = (parseFloat(audioController.volume) + parseFloat(0.1)).toFixed(2);
    
    lowVolumeIconBox.innerHTML = "<i class='fa-solid fa-volume-low'></i>";
    root.style.setProperty("--volume-width", Math.floor(parseFloat(audioController.volume)*100) + '%');
})

lowVolumeIconBox.addEventListener("click", () => {
    if(audioController.volume > 0.1) {
        audioController.volume = (parseFloat(audioController.volume) - parseFloat(0.1)).toFixed(2);
        root.style.setProperty("--volume-width", parseFloat(audioController.volume)*100 + '%');
    } else {
        lowVolumeIconBox.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>";
        audioController.volume = 0;
        root.style.setProperty("--volume-width", 0);
    }
})