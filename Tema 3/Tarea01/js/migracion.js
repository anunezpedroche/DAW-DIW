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


function startMigration(){
    let label = document.querySelector(`steplabel[data-step="${labelStep}"]`);
    label.style.opacity = "0.9";
    console.log(label);
    // Fragmentos perdidos
    // ^(;,;)^
}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click",startMigration);
}

// Init the environment when all is ready
window.onload=init;
