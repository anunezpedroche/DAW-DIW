let disparador = false;

function buscador(){
    disparador = document.getElementById('buscador').addEventListener('input',trigger);
    fetch('http://mapas.valencia.es/lanzadera/opendata/res_aceite/JSON').then(function(response){ return response.json();}).then(function(myJson){filtrazo(myJson.features);})
    
    
    
    
}

function init(){
    buscador();
}

function trigger(){

    return true;
}

function filtrar(){
    let letra = document.getElementById('buscador').value;
    return letra;
}

function filtrazo(a){

}
window.onload=init;