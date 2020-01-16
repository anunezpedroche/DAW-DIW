
function buildGrafico(){
    let data = document.querySelectorAll('.left');
    let values = document.querySelectorAll('.right');

    

    const canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (100, 100, 55, 50);
  
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (300, 300, 55, 50);
}

function loadListeners(){
    document.querySelector("input[name='grafiqueame']").addEventListener("click",buildGrafico);
}


function init(){
    console.log(" * Init ");
    loadListeners();
    
}

window.onload=init;