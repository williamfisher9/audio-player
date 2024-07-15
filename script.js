const playBtn = document.querySelector(".fa-play");
const pauseBtn = document.querySelector(".fa-pause");
const selectFileBtn = document.querySelector(".fa-folder-open");
const start = document.querySelector(".start");
const end = document.querySelector(".end");

const audioController = document.getElementById("audio-controller");

const root = document.querySelector(":root");

playBtn.addEventListener("click", () => {
    audioController.play();
    
    pauseBtn.classList.toggle("hide");
    playBtn.classList.toggle("hide");

    end.textContent = `${Math.floor(audioController.duration/60).toString().padStart(2, '0')}:${Math.floor(60 * (audioController.duration/60 - Math.floor(audioController.duration/60))).toString().padStart(2, '0')}`;
})

pauseBtn.addEventListener("click", () => {
    audioController.pause();
    pauseBtn.classList.toggle("hide");
    playBtn.classList.toggle("hide");
})


selectFileBtn.addEventListener("click", () => {
    
})

audioController.addEventListener("timeupdate", () => {
    start.textContent = `${Math.floor(audioController.currentTime/60).toString().padStart(2, '0')}:${Math.floor(60 * (audioController.currentTime/60 - Math.floor(audioController.currentTime/60))).toString().padStart(2, '0')}`;
    root.style.setProperty("--progress-control-value", Math.floor(audioController.currentTime / audioController.duration*100) + '%');
})