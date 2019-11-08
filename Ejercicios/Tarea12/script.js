function init(){

    document.querySelector("button").addEventListener("click",crearCuadrado);
    
}
function crearCuadrado(){
    let cuadrado = document.createElement("box");
    let padre = document.querySelector("container");
   
    cuadrado.addEventListener("mousedown",darPoder);
    padre.appendChild(cuadrado);

}

function quitarPoder(){
    this.classList.add("desevoluciona");
    this.addEventListener("mousedown",cthulhu);

}

function darPoder(){
    this.classList.add("evoluciona");

    this.addEventListener("mousedown", quitarPoder);
}

function cthulhu(){
    this.classList.add("ultimate");
}

window.onload=init;
