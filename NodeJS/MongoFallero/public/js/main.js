let opciones = document.createElement("select");
let respuestaFallitas;
let url = 'http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON';
let ipCliente;



function secciones(){
    opciones.innerHTML = "";
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
    buscador();
}

function seccionesInfantiles(){
    opciones.innerHTML="";
    //Definimos una variable como 'Set' que es un tipo de ArrayList que sólo nos añade los valores que no se repitan dentro de un array
    let seleccion = new Set;

    //Recuperamos nuestra información del JSON en la variable resultSeccion para aplicarle un forEach
    let resultSeccion = respuestaFallitas.features;

    //Añadimos como primer valor 'Todas' para mostrar todas las fallas
    seleccion.add("Todas");
    
    //Comenzamos el forEach
    resultSeccion.forEach(secciones=>{
        //Añadimos solo las secciones accediendo al atributo sección del JSON
        seleccion.add(secciones.properties.seccion_i);
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
    buscador();
}

function buscador(){
    //Guardamos en una variable el div resultados para rellenarlos más adelante
    let listar = document.querySelector('.resultados');
    //Definimos la variable result y la inicializaremos más tarde dependiendo de las condiciones
    let result;
    //Guardamos los valores para los filtros de año de creación
    let desde = document.getElementById("desde").value;
    let hasta = document.getElementById("hasta").value;


    //Vaciamos el contenedor 'resultados' para volverlo a rellenar
    document.querySelector(".resultados").innerHTML = "";

    //Definimos el objeto result con la respuesta del JSON dependiendo de la sección que tenga seleccionada, si el valor del select es 'Todas' entonces no se le aplicará ningún filtro al objeto
    if(opciones.value==="Todas"){
        result = respuestaFallitas.features;

    }else{
    //Si estamos intentando recuperar las fallas de una determinada función, definiremos result con la función filter y le pasaremos como parámetro nuestra función filtrarSecciones    
        result = respuestaFallitas.features.filter(filtrarSecciones);
        if(document.getElementsByName("tipoFalla")[1].checked){

        }
    }
    //Empezamos el forEach de result para tratar los datos    
    result.forEach(fallas=>{

        //Aplicamos el filtro de fechas (Si está vacío mostrará todas las fallas)
        if((fallas.properties.anyo_fundacion>=desde&&fallas.properties.anyo_fundacion<=hasta)||(desde==''&&hasta=='')){
            //Creamos el div class="fallas"
            let falla = document.createElement("div");
            let puntuacion = document.createElement("form");
            let ip = document.createElement("input");
            let idFalla  = document.createElement("input");
            let sub = document.createElement("input");
            

            puntuacion.method='post';
            puntuacion.action='/api/puntuaciones/';

            sub.type = 'submit';
            sub.value = 'Enviar puntuación';

            idFalla.type = 'hidden';
            idFalla.name = 'idFalla';
            idFalla.value = fallas.properties.id;

            ip.type = 'hidden';
            ip.name = 'ip';
            ip.value = '129.23.5.4';

            //Creamos las puntuaciones
            for(let n = 0, y=5;n<5;n++,y--){
                let stars = document.createElement("label");
                let punt = document.createElement("input");

                //Asociamos las puntuaciones con las fallas
                punt.type='radio';
                punt.id='star'+n+fallas.properties.id;
                punt.value=y;
                punt.setAttribute('idFalla',fallas.properties.id);
                //Creamos los label de los input radio
                stars.htmlFor = 'star'+n+fallas.properties.id;
                stars.innerHTML = '★';
                stars.addEventListener('mouseup',anotarPuntuaciones);

                puntuacion.appendChild(punt);
                puntuacion.appendChild(stars);
            }


            puntuacion.appendChild(idFalla);
            puntuacion.appendChild(ip);
            //puntuacion.appendChild(sub);

            falla.className ="fallas";
            //Comprobamos cuál es el radioButton (Infantil o Principal) que está seleccionado para devolver unos valores u otros
            if(document.getElementById("principal").checked){
                falla.innerHTML=fallas.properties.nombre+"<img src="+fallas.properties.boceto+"></img><br>";
            }else if(document.getElementById("infantil").checked){
                falla.innerHTML="<img src="+fallas.properties.boceto_i+"></img><br>"+fallas.properties.nombre+" -- "+fallas.properties.sector+" -- "+fallas.properties.seccion_i;
            }
            falla.id=fallas.properties.id;
            falla.appendChild(puntuacion);
            listar.appendChild(falla);
        }
        //Finalmente añadimos cada elemento del forEach al div resultados
        
    });
    let puntis = document.querySelectorAll('★');

    obtenerPuntuacionesFallas();
}
//Método genérico para conectar con mongo
function conexionServer(url, metodo, datos, mensaje) {
    fetch(url, {
        method: metodo,
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(alert(mensaje));

}
//Usamos el método anterior para que devuelva los resultados la función mostrarPuntuaciones
function obtenerPuntuacionesFallas(){

    conectarBBDD('/api/puntuaciones',mostrarPuntuaciones);

}

function conectarBBDD(url,funcion){

    fetch(url).then(function (respuesta){
        return respuesta.json();
    }).then(function (myJson){
        funcion(myJson);
    });

}
//Recogemos los datos de todas las fallas y los metemos en un array para tratar su puntuación
function mostrarPuntuaciones(datos){
    //console.log(datos);
    let arrayFallas = [];

    for(let i = 0; i<datos.length;i++){

        let idFalla = datos[i].idFalla;
        let puntos = datos[i].puntuacion;
        let ip = datos[i].ip;
        //console.log(puntos);
        let falla = devolverPuntuaciones(idFalla,arrayFallas);
        //console.log(falla);
        //console.log(falla[1]);
        if(falla !=''){
            falla.vecesVotada++;
            falla.puntosTotales = falla.puntosTotales + puntos;
            falla.media = falla.puntosTotales / falla.vecesVotada;
        } else {
            let falla = new Falla(idFalla,puntos,1,puntos,ip);
            arrayFallas.push(falla);
        } 
    }
    //console.log(arrayFallas[10]);
    for(let i = 0; i<arrayFallas.length;i++){
        //console.log(arrayFallas[1].media);
        let puntos = Math.round(arrayFallas[i].media);
        let puntacos = 5 - puntos;
        let cuadroFalla = document.getElementById(arrayFallas[i].idFalla);
        let puntuacion = document.getElementById('star'+puntacos+arrayFallas[i].idFalla);
        
        puntuacion.checked = true;
        
        //console.log(puntuacion);
        //console.log(puntos);
    }

}

function devolverPuntuaciones(idFalla,arrayFalla){

    let falla='';

    for(let i = 0; i < arrayFalla.length;i++){

        if(idFalla == arrayFalla[i].idFalla){
            falla = arrayFalla[i];
        }

    }
    //console.log(arrayFalla);
    return falla;
}

function anotarPuntuaciones(){
    let puntos = this.previousSibling.value;
    let id = this.previousSibling.attributes.idFalla.value;
    let url;
    let data = {idFalla: id, ip: ipCliente, puntuacion: puntos};

    fetch('/api/puntuaciones/votadas/'+id+'/'+ipCliente).then(function(response){
        return response.json();
    }).then(function (myJson){
        
        
        
        if(myJson==false){
            url = '/api/puntuaciones/';
            conexionServer(url,'POST',data,'Puntuación enviada');
        }else{
            url = '/api/puntuaciones/'+myJson[0]._id;
            conexionServer(url,'PUT',data,'Puntuación modificada');
        }
    });
}

function ubicacion(){
    console.log('hola');
}

function filtrarSecciones(elemento){
    //Recuperamos el valor actual del select
    let valor = document.querySelector("select");
    let resultado;
    if(document.getElementsByName("tipoFalla")[1].checked){
        resultado = elemento.properties.seccion_i.startsWith(valor.value);
    }else{
        resultado = elemento.properties.seccion.startsWith(valor.value);
    }
    //Lo devolvemos para aplicar el filtro
    return resultado;
}

function recuperarDatos(){
    //Recuperamos los datos del JSON y los devolvemos a una variable para tratarla de forma más cómoda y más rápido que mediante el fetch en la función buscador
    return fetch(url).then(responseFallas => responseFallas.json())
    .then(respuestaFallas =>{
        respuestaFallitas = respuestaFallas;
    });
}

//Pruebas para cruzar datos con otra API del ayuntamiento de Valencia
/*function recuperarBarracas(){

    fetch('http://mapas.valencia.es/lanzadera/opendata/falla_barracas/JSON').then(responseBarracas=> responseBarracas.json())
    .then(respuestaBarracas=>{
        respuestaBarraquitas = respuestaBarracas;
    });

}
*/

//Definimos init como función asíncrona ya que si no lo fuese tendríamos problemas a la hora de generar el select, tratando antes de rellenar el select sin tener los datos
async function init(){
    //recuperarBarracas();
    //Le decimos que se espere a recoger los datos del JSON antes de continuar con la generación del documento, ya que si no nos podría dar problemas a la hora de crear elementos sin contenido
    await recuperarDatos();
    //crearPtosFicticios();
    document.querySelector(".filtro").appendChild(opciones);
    buscador();
    secciones();


    //document.querySelector("").addEventListener("click",ubicacion);
    document.querySelector("select").addEventListener("change",buscador);
    document.getElementById("hasta").addEventListener("change",buscador);
    let tipoFallas = document.getElementsByName("tipoFalla");
    tipoFallas[0].addEventListener("click",secciones);
    tipoFallas[1].addEventListener("click",seccionesInfantiles);
    document.getElementById("desde").addEventListener("change",buscador);

    //document.getElementById("principal").addEventListener("click",buscador);
    //document.getElementById("infantil").addEventListener("click",buscador);
    getIP();
}

function getIP(json){

    if(json!=undefined) ipCliente = json.ip;

}
/*
function crearPtosFicticios() {
    let datosJSON = respuestaFallitas;
    var url = '/api/puntuaciones';
    let ptos;
    let datos;
    let ip = 1000;
    let listaIdsFalla = new Set();

    //averiguamos todos los idFalla que existen en el JSON para asignarles puntuaciones
    for (let i = 0; i < datosJSON.features.length; i++) {

        listaIdsFalla.add(datosJSON.features[i].properties.id);

    }

    for (let id of listaIdsFalla) {

        for (let x = 0; x < 3; x++) {

            ip++;
            //Puntuamos del 1 al 5 de forma aletaroia
            ptos = Math.floor(Math.random() * (6 - 1)) + 1;
            datos = { idFalla: id, ip: ip, puntuacion: ptos };

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error));
        }
    }
}
*/
function Falla(idFalla = 0,puntosTotales = 0, vecesVotada = 0, media= 0, ip = '0'){

    this.idFalla = idFalla;
    this.puntosTotales = puntosTotales;
    this.vecesVotada = vecesVotada;
    this.media = media;
    this.ip = ip;

}

window.onload=init;