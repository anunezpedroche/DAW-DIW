/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/
let labelStep = 1;
let prog = 2;
let finalMsg = 3;
let clicked=  true;
function promesaMigrar(x){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 50);
    });
}
function clicky(){
    if(clicked==true){
        startMigration();
    }
}

async function startMigration(){
    clicked = false;
    let label = document.querySelector(`steplabel[data-step="${labelStep}"]`);
    let progress = document.querySelector(`progress[data-step="${prog}"]`);
    let msg = document.querySelector(`finalmsg[data-step="${finalMsg}"]`);
    label.classList.add("estabaEscondido");
    progress.classList.add("estabaEscondido");
    for(var i = 0;i<100;i++){
        progress.value = i;
        let promesa = promesaMigrar(10);
        await promesa;
    }
    msg.classList.add("estabaEscondido");
    let transit = document.querySelector(`finalmsg[data-step="${finalMsg}"]`);
    labelStep +=3;
    prog +=3;
    finalMsg += 3;
    transit.addEventListener("transitionend",startMigration);
}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
        document.querySelector("button").addEventListener("click",clicky);
    
}

// Init the environment when all is ready
window.onload=init;
