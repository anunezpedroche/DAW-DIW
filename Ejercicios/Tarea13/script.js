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
        saltar=false;
        botar=false;
    });
    header.appendChild(botones2).classList.add("saltar");
    botones2.addEventListener("click", function() {
        saltar=true;
        botar=false;
        parar=false;
    });
    header.appendChild(botones3).classList.add("brincar");
    botones3.addEventListener("click",function() {
        botar=true;
        saltar=false;
        parar=false;
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
        this.classList.add("saltarino");
        this.classList.remove("rotarino");
        saltar = false;
    }
    if(botar){
        this.classList.add("rotarino");
        this.classList.remove("saltarino");
        botar =false;
    }
    if(parar){
        this.classList.remove("saltarino");
        this.classList.remove("rotarino");
        parar = false;
    }
}
window.onload=init;
