
function capturarAudio(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let div = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    console.log(div);
    
    div.classList.add("transitioning");
    div.classList.remove("key");
    console.log(div);
    audio.play();
}

function removerSonido(){
    console.log("HOLA");
    this.classList.remove("transitioning");
    this.classList.add("key");
}
const keys = document.querySelectorAll(".key");

keys.forEach(key =>key.addEventListener("transitionend",removerSonido));
window.addEventListener("keypress",capturarAudio);
