let disparador = false;

function buscador(){
    disparador = document.getElementById('buscador').addEventListener('input',trigger);
    fetch('http://mapas.valencia.es/lanzadera/opendata/res_aceite/JSON').then(response => {
    
        return response.json();
    
    }).then(respuesta =>{
    
    console.log(respuesta.features[43]);
    const result = respuesta.features.filter(filtrar);
    let listar = document.createElement('ul');

        result.forEach(aceite=>{

            let listadito = document.createElement('li');
            listadito.innerHTML=aceite.properties.direccion+" -- "+aceite.properties.centro+" --["+aceite.geometry.coordinates+"]";
            listar.appendChild(listadito);
            console.log(listadito);
        });
        document.querySelector(".resultados").innerHTML = "";
        document.querySelector(".resultados").appendChild(listar);

    });
}

function upper(){
    document.getElementById('buscador').value = document.getElementById('buscador').value.toUpperCase();
}  

function init(){
    document.getElementById('buscar').addEventListener('click',buscador);
    document.getElementById('buscador').addEventListener('input',upper);
}

function trigger(){

    return true;
}

function filtrar(elemento){
    let letra = document.getElementById('buscador').value;
    return elemento.properties.centro.startsWith(letra);
}

function filtrazo(a){

}
window.onload=init;