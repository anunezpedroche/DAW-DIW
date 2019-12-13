let disparador = false;
let opciones = document.createElement("select");

function secciones(){
    fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON').then(responseSection => {

        return responseSection.json();
    
    }).then(respuestaSeccion =>{

        let seleccion = new Set;
        let resultSeccion = respuestaSeccion.features;
       
        seleccion.add("Todas");
        
        resultSeccion.forEach(secciones=>{

            seleccion.add(secciones.properties.seccion);

        });
        seleccion.forEach(options=>{
            let secciones = document.createElement("option");

            secciones.value = options;
            secciones.innerHTML = options;
            opciones.appendChild(secciones);

        });

        document.querySelector(".filtro").appendChild(opciones);
    });

}

function buscador(){
    fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON').then(response => {

        return response.json();
    
    }).then(respuesta =>{
        //Definimos las variables
    let valor = document.querySelector("select");
    let listar = document.createElement('div');
    let seleccion = new Set;
    let todes = document.createElement("option");
    let result;
    let desde = document.getElementById("desde").value;
    let hasta = document.getElementById("hasta").value;
    let param;
    console.log(desde);
    if(valor.value==="Todas"){
        result = respuesta.features;
    }else{
        result = respuesta.features.filter(filtrarSecciones);
    }

    
    seleccion.clear();
    opciones.name = "secciones";
        
        result.forEach(fallas=>{
            seleccion.add("Todas");
            let falla = document.createElement("div");
            falla.className ="fallas";
            if(fallas.properties.anyo_fundacion>=desde&&fallas.properties.anyo_fundacion<=hasta){

                if(document.getElementById("principal").checked){
                    falla.innerHTML="<img src="+fallas.properties.boceto+"></img><br>"+fallas.properties.nombre+" -- "+fallas.properties.sector+" -- "+fallas.properties.seccion;
                }else if(document.getElementById("infantil").checked){
                    falla.innerHTML="<img src="+fallas.properties.boceto_i+"></img><br>"+fallas.properties.nombre+" -- "+fallas.properties.sector+" -- "+fallas.properties.seccion_i;
                }else{
    
                }
    
                listar.appendChild(falla);
            }

            
        });

        document.querySelector(".resultados").innerHTML = "";
        document.querySelector(".resultados").appendChild(listar);

    });
}

function upper(){

}  

function init(){

    document.querySelector(".filtro").appendChild(opciones);
    secciones();
    buscador();
    //document.getElementById('buscador').addEventListener('input',upper);
    document.querySelector("select").addEventListener("change",buscador);
    document.getElementById("hasta").addEventListener("change",buscador);
}

function filtrarSecciones(elemento){
    let valor = document.querySelector("select");
    return elemento.properties.seccion.startsWith(valor.value);
}

window.onload=init;