const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

function pintarTablero(){
let x = 0;
let y = 0;
let blanco = true;
ctx.fillStyle = 'rgb(0,0,255)';

for(var e = 0;e<8;e++){
    for(var i = 0;i<8;i++){
        if(blanco == true) ctx.fillStyle= 'rgb(0,0,255)';
        if(blanco == false) ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(x,y,62.5,62.5);
            y += 62.5;

        blanco = !blanco;
        console.log(blanco);
    }
    x+=62.5;
    y=0;
    blanco = !blanco;
}

ctx.beginPath();
ctx.lineTo(0,0);
ctx.lineTo(500,0);
ctx.lineTo(500,500);
ctx.lineTo(0,500);
ctx.lineTo(0,0);
ctx.stroke();


}

function init(){
    pintarTablero();
}

window.onload = init;