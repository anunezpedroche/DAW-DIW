/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

let labelStep = 1;
let prog = 2;
let finalMsg = 3;
let clicked=  true;

function promesaMigrar(x){
//With this promise we can simulate the current action of the Miskatonik migration
    return new Promise(resolve => {

        setTimeout(() => {

            resolve(x);

        }, 29);

    });

}

function clicky(){
//Disabling button
    if(clicked==true){

        startMigration();

    }

}

async function startMigration(){

    clicked = false;
    //Catch the DOM elements that we going to work
    let label = document.querySelector(`steplabel[data-step="${labelStep}"]`);
    let progress = document.querySelector(`progress[data-step="${prog}"]`);
    let msg = document.querySelector(`finalmsg[data-step="${finalMsg}"]`);
    if(!label||!progress||!msg)
    return;
    //Add each class to DOM elements
    label.classList.add("estabaEscondido");
    progress.classList.add("estabaEscondido");

    //Increment value in progress-bar
    for(var i = 0;i<100;i++){

        progress.value = i;
        //Adding a promise awaiting a short time
        let promesa =  await promesaMigrar(10);

    }

    //Once progress-bar it's full, then show "Completado"
    msg.classList.add("estabaEscondido");
    msg.classList.add("neon");

    //Save the finalMsg because we going to increment their value and we need current value
    let transit = document.querySelector(`finalmsg[data-step="${finalMsg}"]`);

    labelStep +=3;
    prog +=3;
    finalMsg += 3;

    //Call again to startMigration
    transit.addEventListener("transitionend",startMigration);
}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
        document.querySelector("button").addEventListener("click",clicky);
    
}

// Init the environment when all is ready
window.onload=init;