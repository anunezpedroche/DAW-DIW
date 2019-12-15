let opciones = document.createElement("select");
let respuestaFallitas;
let url = 'http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON';

function secciones(){
        //Definimos una variable como 'Set' que es un tipo de ArrayList que sólo nos añade los valores que no se repitan dentro de un array
        let seleccion = new Set;

        //Recuperamos nuestra información del JSON en la variable resultSeccion para aplicarle un forEach
        let resultSeccion = respuestaFallitas.features;

        //Añadimos como primer valor 'Todas' para mostrar todas las fallas
        seleccion.add("Todas");
        
        //Comenzamos el forEach
        resultSeccion.forEach(secciones=>{
            //Añadimos solo las secciones accediendo al atributo sección del JSON
            seleccion.add(secciones.properties.seccion);
            //Como únicamente nos está añadiendo los valores que no se repiten, más tarde podremos directamente crear un select con estos datos sin volver a tocar el Set (a menos que queramos ordenarlos alfabéticamente)
        });
        
        //Ahora vamos a realizar un forEach a cada elemento del ArrayList para añadirlo al select original

        seleccion.forEach(options=>{

            //Creamos una opción por cada elemento que va a tener nuestro select
            let secciones = document.createElement("option");
            //Le añadimos el valor dentro del forEach a esa nueva sección
            secciones.innerText = options;
            //Finalmente añadimos al select nuestro nuevo option
            opciones.appendChild(secciones);

        });
        //Aplicamos el elemento opciones dentro del div con clase filtro
        document.querySelector(".filtro").insertBefore(opciones,document.querySelector('form'));
        }

function buscador(){
    //Guardamos en una variable el div resultados para rellenarlos más adelante
    let listar = document.querySelector('.resultados');
    //Definimos la variable result y la inicializaremos más tarde dependiendo de las condiciones
    let result;
    //Guardamos los valores para los filtros de año de creación
    let desde = document.getElementById("desde").value;
    let hasta = document.getElementById("hasta").value;
    console.log(desde);
    console.log(hasta);
    //Vaciamos el contenedor 'resultados' para volverlo a rellenar
    document.querySelector(".resultados").innerHTML = "";

    //Definimos el objeto result con la respuesta del JSON dependiendo de la sección que tenga seleccionada, si el valor del select es 'Todas' entonces no se le aplicará ningún filtro al objeto
    if(opciones.value==="Todas"){
        result = respuestaFallitas.features;
    }else{
    //Si estamos intentando recuperar las fallas de una determinada función, definiremos result con la función filter y le pasaremos como parámetro nuestra función filtrarSecciones    
        result = respuestaFallitas.features.filter(filtrarSecciones);
    }
    //Empezamos el forEach de result para tratar los datos    
    result.forEach(fallas=>{
        //Creamos el div class="fallas"
        let falla = document.createElement("div");
        falla.className ="fallas";
        //Aplicamos el filtro de fechas (Si está vacío mostrará todas las fallas)
        if((fallas.properties.anyo_fundacion>=desde&&fallas.properties.anyo_fundacion<=hasta)||(desde==''&&hasta=='')){
            //Comprobamos cuál es el radioButton (Infantil o Principal) que está seleccionado para devolver unos valores u otros
            if(document.getElementById("principal").checked){
                falla.innerHTML="<img src="+fallas.properties.boceto+"></img><br>"+fallas.properties.nombre+" -- "+fallas.properties.sector+" -- "+fallas.properties.seccion+" Coordenadas: "+fallas.geometry.coordinates;
            }else if(document.getElementById("infantil").checked){
                falla.innerHTML="<img src="+fallas.properties.boceto_i+"></img><br>"+fallas.properties.nombre+" -- "+fallas.properties.sector+" -- "+fallas.properties.seccion_i;
            }
        
        }
        //Finalmente añadimos cada elemento del forEach al div resultados
        listar.appendChild(falla);
    });
}

function filtrarSecciones(elemento){
    //Recuperamos el valor actual del select
    let valor = document.querySelector("select");
    //Lo devolvemos para aplicar el filtro
    return elemento.properties.seccion.startsWith(valor.value);
}

function recuperarDatos(){
    //Recuperamos los datos del JSON y los devolvemos a una variable para tratarla de forma más cómoda y más rápido que mediante el fetch en la función buscador
    return fetch(url).then(responseFallas => responseFallas.json())
    .then(respuestaFallas =>{
        console.log(respuestaFallas);
        respuestaFallitas = respuestaFallas;
    });
}


//Pruebas para cruzar datos con otra API del ayuntamiento de Valencia
function recuperarBarracas(){

    fetch('http://mapas.valencia.es/lanzadera/opendata/falla_barracas/JSON').then(responseBarracas=> responseBarracas.json())
    .then(respuestaBarracas=>{
        respuestaBarraquitas = respuestaBarracas;
    });

}

//Definimos init como función asíncrona ya que si no lo fuese tendríamos problemas a la hora de generar el select, tratando antes de rellenar el select sin tener los datos
async function init(){
    recuperarBarracas();
    //Le decimos que se espere a recoger los datos del JSON antes de continuar con la generación del documento, ya que si no nos podría dar problemas a la hora de crear elementos sin contenido
    await recuperarDatos();
    document.querySelector(".filtro").appendChild(opciones);
    buscador();
    secciones();
    document.querySelector("select").addEventListener("change",buscador);
    document.getElementById("hasta").addEventListener("change",buscador);
    document.getElementById("desde").addEventListener("change",buscador);
    document.getElementById("principal").addEventListener("click",buscador);
    document.getElementById("infantil").addEventListener("click",buscador);
}

window.onload=init;