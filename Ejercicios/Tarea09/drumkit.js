
function capturarAudio(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let div = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
   
    
    div.classList.add("transitioning");
    div.classList.remove("key");
    
    audio.play();
}

function removerSonido(){
    this.classList.remove("transitioning");
    this.classList.add("key");
}
const keys = document.querySelectorAll(".key");

keys.forEach(key =>key.addEventListener("transitionend",removerSonido));
window.addEventListener("keypress",capturarAudio);
