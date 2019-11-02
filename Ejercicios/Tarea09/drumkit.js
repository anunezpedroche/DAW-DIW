
function capturarAudio(e){
    console.log(e.keyCode);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    if(!audio) return;
    audio.currentTime = 0;
    audio.play();

    audio.classList.add("playing");
}

function removerSonido(e){
    e.classList.remove("transitioning");
}
const keys = document.querySelectorAll(".key");
keys.forEach(key =>key.addEventListener("transitionend",removerSonido));
window.addEventListener("keypress",capturarAudio);
