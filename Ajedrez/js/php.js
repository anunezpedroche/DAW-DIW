let jugador = '';
let respuesta;



function init(){
    document.getElementById('enviar').addEventListener('click',mostrar);
    
}
async function mostrar(){
    await recuperarAjedrez();
    let resultados = document.getElementById('resultados');
    console.log(respuesta);
    mandarAjedrez();
}
function recuperarAjedrez(){
    console.log('hola');
    jugador = document.getElementById('jugador').value;
    return fetch(`http://192.168.4.92/rest-get.php?nombre=Angel`).then(ajedrezjson => ajedrezjson.json())
    .then(jsonAjedrez =>{
        respuesta = jsonAjedrez;
    });
}

function mandarAjedrez(){
   // console.log('hola');
   let nombre = {nombre:'Angel'};
    jugador = document.getElementById('jugador').value;
    let myInit = {
        method:'post',
        body: JSON.stringify(nombre),
        mode: 'cors'
    };
    return fetch(`http://192.168.4.92/rest-post.php`,myInit).then(ajedrezjson => ajedrezjson.json())
    .then(jsonAjedrez =>{
        console.log(jsonAjedrez);
    });
}


window.onload = init;