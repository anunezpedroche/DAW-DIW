let jugador = '';
let respuesta;



function init(){
    document.getElementById('jugador').addEventListener('change',mostrar);
    
}
async function mostrar(){
    await recuperarAjedrez();
    let resultados = document.getElementById('resultados');
    let resultaditos = respuesta.games;
    for(let i = 0;i<resultaditos.length;i++){
        let partidita = document.createElement('div');
        partidita.innerHTML='<div id='+resultaditos[i].start_time+'>Rated:'+resultaditos[i].rated+'<br>PGN: '+resultaditos[i].pgn+'</div>';
        resultados.appendChild(partidita);
    }
}
function recuperarAjedrez(){
    console.log('hola');
    jugador = document.getElementById('jugador').value;
    return fetch(`https://api.chess.com/pub/player/${jugador}/games`).then(ajedrezjson => ajedrezjson.json())
    .then(jsonAjedrez =>{
        respuesta = jsonAjedrez;
    });
}


window.onload = init;