
function buildGrafico(){
    let data = document.querySelectorAll('.left');
    let values = document.querySelectorAll('.right');

    

    const canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    /*ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (100, 100, 55, 50);
  
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (300, 300, 55, 50);*/

    ctx.fillStyle = "rgb(0,0,200)";
    console.log(Math.PI*2);
    let total = Math.PI*2;
    let primerDato = (total / 1.3333333) * -1;
    let segundoDato = (total/ 1.3333333);
    let tercerDato = (total/1.3333333) * -1;
    console.log(primerDato);
    ctx.arc(100,100,50,0,primerDato);
    ctx.arc(100,100,50,primerDato,segundoDato);
    ctx.arc(100,100,50,segundoDato,tercerDato);

    ctx.stroke();
}

function loadListeners(){
    document.querySelector("input[name='grafiqueame']").addEventListener("click",buildGrafico);
}


function init(){
    console.log(" * Init ");
    loadListeners();
    
}

window.onload=init;