let disparador = false;
let opciones = document.createElement("select");

function buscador(){
    disparador = document.getElementById('buscador').addEventListener('input',trigger);
    fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON').then(response => {

        return response.json();
    
    }).then(respuesta =>{
        //Definimos las variables
    let valor = document.querySelector("select");
    let listar = document.createElement('div');
    let seleccion = new Set;
    let todes = document.createElement("option");
    let result;
    if(valor.value==="Todas"){
        opciones.innerHTML="";
        result = respuesta.features;
    }else{
        result = respuesta.features.filter(filtrar);
    }
    //Añadimos la
    seleccion.clear();
    opciones.name = "secciones";
    //todes.innerHTML = "Todas";
    //opciones.appendChild(todes);
        
        result.forEach(fallas=>{
            seleccion.add("Todas");
            let falla = document.createElement("div");
            falla.className ="fallas";
            let boceto = document.createElement('img');
            let listadito = document.createElement('li'); 
            seleccion.add(fallas.properties.seccion);

            //boceto.src = fallas.properties.boceto;

            falla.innerHTML="<img src="+fallas.properties.boceto+"></img><br>"+fallas.properties.nombre+" -- "+fallas.properties.sector+" -- "+fallas.properties.seccion;
            //falla.appendChild(boceto);
            listar.appendChild(falla);
            
        });

        seleccion.forEach(options=>{
        
        let secciones = document.createElement("option");
        secciones.value = options;
        secciones.innerHTML = options;
        opciones.appendChild(secciones);

        });
        document.querySelector(".filtro").appendChild(opciones);
        document.querySelector(".resultados").innerHTML = "";
        document.querySelector(".resultados").appendChild(listar);

    });
}

function upper(){
    document.getElementById('buscador').value = document.getElementById('buscador').value.toUpperCase();
}  

function init(){

    
    document.querySelector(".filtro").appendChild(opciones);
    buscador();
    document.getElementById('buscador').addEventListener('input',upper);
    document.querySelector("select").addEventListener("change",buscador);
}

function trigger(){

    return true;
}

function filtrar(elemento){
    let valor = document.querySelector("select");
    return elemento.properties.seccion.startsWith(valor.value);
}

function filtrazo(a){

}
window.onload=init;