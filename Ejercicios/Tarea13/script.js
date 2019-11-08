let saltar = false;
let botar = false;
let parar = false;

function init(){
    let header = document.querySelector("header");
    let botones = document.createElement("boton");
    
    let botones2 = document.createElement("boton");
    let botones3= document.createElement("boton");

    header.appendChild(botones).classList.add("parar");
    botones.addEventListener("click", function() {
        parar=true;
    });
    header.appendChild(botones2).classList.add("saltar");
    botones2.addEventListener("click", function() {
        saltar=true;
    });
    header.appendChild(botones3).classList.add("brincar");
    botones3.addEventListener("click",function() {
        botar=true;
    });
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
    this.addEventListener("mousedown",mostrar);
}

function mostrar(){
    if(saltar){
        this.classList.add("saltar");
    }
    if(botar){
        this.classList.add("brincar");
    }
    if(parar){
        this.classList.remove("saltar");
        this.classList.remove("brincar");
    }
}
window.onload=init;
