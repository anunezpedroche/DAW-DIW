import Rex from './js/rex.js';
/*
-----------------------------------------TODO LIST-------------------------------------------
1- MEJORAR RANDOMIZAR OBJETOS (A VECES FALLA)                     
2- EVITAR QUE ENEMIGOS SE SUPERPONGAN 
3- AÑADIR INVENTARIO
4- PUNTUACIÓN CONSTANTE
5- AÑADIR SPRITES
6- AÑADIR VIDAS?                    
7- LIMPIAR CÓDIGO

-----------------------------------DEFINICIÓN VARIABLES GLOBALES------------------------------*/
var arrayVillanos = new Array();
var navMap = document.createElement("div");
let inventario = document.createElement("div");
var heroePosicionX = 8;
var muerteRex = false;
var heroePosicionY = 1;
let inventarioStinger = false;
let numeroMomias = 1;
var mapa = new Array(15);
var der = 0;
var izq = 0;
var abj = 0;
var arr = 0;
var stingerX = 2;
var stingerY = 4;
var tarjetaX = 2;
var tarjetaY = 7;
var cajaX = 6;
var cajaY = 4;
var rayX = 6;
var rayY = 7;
var pilY = 3;
var pilX = 1;
var revelado = false;
let inventarioCaja=false;
let inventarioTarjeta= false;
let ray = false;
let level = 1;
let score = 0;
// DEFINICIÓN ARRAY MAPA
function crearMapa(){
    for (var i = 0; i < mapa.length; i++) {
        mapa[i] = new Array(21);
}

}
function randomizarObjetos(){
    var counter = 20;
    let objetos = new Array();
    for (var fil = 0; fil < 4; fil++) {
        for (var col = 0; col < 5; col++) {

    let randomizer = Math.floor(Math.random()*4);
            console.log(randomizer);
            console.log(pilX,pilY);
            if(pilY>14){
                pilY=3;
            }
            if(pilX>17){
                pilX=4;
            }
        if(randomizer==0){
            stingerY = pilY+1;
            stingerX = pilX+1;
            pilY += 3;
            
        }
        if(randomizer==1){
            tarjetaX=pilX+1;
            tarjetaY=pilY+1;
            pilY+= 3;
            
        }
        if(randomizer==2){
            rayX=pilX+1;
            rayY=pilY+1;
            pilX += 4;
            
        }
        if(randomizer==3){
            cajaX=pilX+1;
            cajaY=pilY+1;
            pilX += 4;
            
        }
        }
        pilX = 1;
        pilY += 3;
        counter--;
    }

}

/*------------------------------------PINTA EL MAPA------------------------------------------- */
function pintarMapa() {

    for (var a = 0; a < mapa.length; a++) {
        for (var j = 0; j < mapa[a].length; j++) {
            navMap = document.createElement("div");
            if (a == heroePosicionY && j == heroePosicionX) {
                navMap.classList.add("der1");
            }

            if (a % 3 == 2 || j % 4 == 0 && a != 1 && a != 0 || j == 8 && mapa[3][4] != true && a!=0) {
                navMap.classList.add("pasillo");
            } else if (a != 0 && a != 1) {
                navMap.classList.add("pilares");
            }else if(a==0||a==1 && j!=8){
                navMap.classList.add("pilares");
            }
            if (a==0&&j==8) {
                navMap.classList.remove("pilares");
                navMap.classList.add("puerta");
            }
            document.getElementById("inventario").innerHTML= 'Nivel '+level+'<br>Score '+score;
            document.querySelector(".mapa").appendChild(navMap);
            mapa[a][j] = navMap;
            document.onkeydown = movimiento;

        }
    }


}
function borrarPersonaje(){
    mapa[heroePosicionY][heroePosicionX].classList.remove("der1");
    mapa[heroePosicionY][heroePosicionX].classList.remove("der2");
    //Elimina posición en Y-
    mapa[heroePosicionY][heroePosicionX].classList.remove("izq1");
    mapa[heroePosicionY][heroePosicionX].classList.remove("izq2");
    //Elimina posición en X-
    mapa[heroePosicionY][heroePosicionX].classList.remove("abj1");
    mapa[heroePosicionY][heroePosicionX].classList.remove("abj2");
    //Elimina posición en X+
    mapa[heroePosicionY][heroePosicionX].classList.remove("arr1");
    mapa[heroePosicionY][heroePosicionX].classList.remove("arr2");
}
/*-------------------------------------MOVIMIENTO DEL PERSONAJE----------------------------------------------*/

function movimiento(evento) {
    
   
    var posAntHX = heroePosicionX;
    var posAntHY = heroePosicionY;

        
    switch (evento.key) {

        case "s":
            //Abajo
            if (mapa[heroePosicionY + 1][heroePosicionX].className.indexOf("pasillo") >= 0) {
                borrarPersonaje();

                heroePosicionY++;
                mapa[heroePosicionY - 1][heroePosicionX].classList.add("pisado");
                //Movimiento GRÁFICO del personaje ABAJO
                if (abj == 0) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq1");
                    abj = 1;
                } else if (abj == 1) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("der1");
                    abj = 0;
                }
                
            }
            
            subirNivel();
            columnas();
            break;
        //Arriba
        case "w":
            if (mapa[heroePosicionY - 1][heroePosicionX].className.indexOf("pasillo") >= 0) {
                borrarPersonaje();
                heroePosicionY--;
                mapa[heroePosicionY + 1][heroePosicionX].classList.add("pisado");
                //Movimiento GRÁFICO del personaje ARRIBA
                if (arr == 1) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("der1");
                    arr = 0;
                } else if (arr == 0) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq1");
                    arr = 1;
                }
            }
            subirNivel();
            columnas();

            break;
        //Derecha
        case "d":
            if (mapa[heroePosicionY][heroePosicionX + 1].className.indexOf("pasillo") >= 0) {
                borrarPersonaje();
                //Movimiento del personaje
                heroePosicionX++;
                mapa[heroePosicionY][heroePosicionX - 1].classList.add("pisado");

                //Movimiento GRÁFICO del personaje DERECHA
                if (der == 1) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("der1");
                    der = 0;
                } else if (der == 0) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("der2");
                    der = 1;
                }
            }
            subirNivel();
            columnas();
            break;
        //Izquierda
        case "a":
            if (mapa[heroePosicionY][heroePosicionX - 1].className.indexOf("pasillo") >= 0) {
                borrarPersonaje();
                heroePosicionX--;

                mapa[heroePosicionY][heroePosicionX + 1].classList.add("pisado");
                //Movimiento GRÁFICO del personaje IZQUIERDA
                if (izq == 1) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq1");
                    izq = 0;
                } else if (izq == 0) {
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq2");
                    izq = 1;
                }

            }
            subirNivel();
            columnas();
            break;
        default:
            break;



    }
}

/*-------------------------------------------MOVIMIENTO METAL GEAR REX------------------------------------------------*/


function revelarPilar(posY, posX) {
    // Y fila
    // X columna
    revelado = false
    if (!mapa[posY - 1][posX].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY - 1][posX + 1].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY - 1][posX + 2].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY - 1][posX + 3].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY - 1][posX - 1].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY + 2][posX].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY + 2][posX + 1].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY + 2][posX + 2].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY + 2][posX + 3].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY + 2][posX - 1].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY][posX - 1].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY + 1][posX - 1].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY][posX + 3].classList.contains("pisado")) {
        return revelado;
    }
    if (!mapa[posY + 1][posX + 3].classList.contains("pisado")) {
        return revelado;
    }


    return true;

}



/*REVELAR COLUMNAS */



function columnas() {
    if(inventarioTarjeta==true&&inventarioCaja==true){
        mapa[0][8].classList.remove("puerta");
        mapa[0][8].classList.add("pasillo");
    }
    var fil = 0;
    var col = 0;
    for (fil = 0; fil < 5; fil++) {
        for (col = 0; col < 6; col++) {
            if (pilY >= 15) {
                pilY = 3;
            }
            if (pilX >= 21) {
                pilX = 1;
            }
            if (revelarPilar(pilY, pilX) == true) {
                
                mapa[pilY + 1][pilX + 2].classList.add("revelada");
                mapa[pilY][pilX + 1].classList.add("revelada");
                mapa[pilY][pilX + 2].classList.add("revelada");
                mapa[pilY][pilX].classList.add("revelada");
                mapa[pilY + 1][pilX].classList.add("revelada");
                mapa[pilY + 1][pilX + 1].classList.add("revelada");
                if (stingerY == pilY + 1 && stingerX == pilX + 1&&inventarioStinger==false) {
                    score += 20;
                    mapa[pilY + 1][pilX + 1].classList.add("stinger");
                    if(muerteRex==false){
                    inventarioStinger = true;
                    }
                  }
                if (tarjetaY == pilY + 1 && tarjetaX == pilX + 1&&inventarioTarjeta==false) {
                    score +=50;
                    mapa[pilY + 1][pilX + 1].classList.add("tarjeta");
                    inventarioTarjeta=true;
                    abrirPuerta();

                }
                if (cajaY == pilY + 1 && cajaX == pilX + 1&&inventarioCaja==false) {
                    score +=50;
                    mapa[pilY + 1][pilX + 1].classList.add("caja");
                    inventarioCaja=true;
                    abrirPuerta();

                }
                if (rayY == pilY + 1 && rayX == pilX + 1&&ray==false) {
                    score -=100;
                    mapa[pilY + 1][pilX + 1].classList.add("rexIzq1");
                    anyadirRex();
                    ray = true;
                    numeroMomias++;

                }

            }
            pilX += 4;
        }
        pilX = 1;
        pilY += 3;
    }

}

function borrarRex(index){
    mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexIzq1");
    mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexIzq2");
    mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexDer1");
    mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexDer2");
}


function anyadirRex() {

    let v = new Rex(14, Math.floor(Math.random() * 21));
    arrayVillanos.push(v);

    for (let index = 0; index < arrayVillanos.length; index++) {

        mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.add("rexIzq1");
    }

}

function movimientoV() {
   
    for (let index = 0; index < arrayVillanos.length; index++) {
        if(heroePosicionX==arrayVillanos[index]._posicionX&&heroePosicionY==arrayVillanos[index]._posicionY&&inventarioStinger==false){
            gameOver();
        }
            if(arrayVillanos[index]._posicionY==heroePosicionY&&arrayVillanos[index]._posicionX==heroePosicionX&&inventarioStinger==true){
                score+=100;
                borrarRex(index);
                arrayVillanos.slice(index,index);
                muerteRex=true;
                inventarioStinger=false;
                numeroMomias--;
            }
            
            if (arrayVillanos[index]._posicionX < heroePosicionX) {
                if (arrayVillanos[index]._posicionX + 1 <= 20) { //derecha
    
                    if (!mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX + 1].classList.contains("pilares")) {
    
                        mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexIzq1");
                        mapa[arrayVillanos[index]._posicionY][++arrayVillanos[index]._posicionX].classList.add("rexIzq1");
    
                    }
    
                }
            } else if (arrayVillanos[index]._posicionX > heroePosicionX) {
                if (arrayVillanos[index]._posicionX - 1 >= 0) {
    
                    if (!mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX - 1].classList.contains("pilares")) {
    
                        mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexIzq1");
                        mapa[arrayVillanos[index]._posicionY][--arrayVillanos[index]._posicionX].classList.add("rexIzq1");
    
                    }
                }
    
            }
    
            if (arrayVillanos[index]._posicionY > heroePosicionY) {
                if (arrayVillanos[index]._posicionY - 1 >= 1) {
    
                    if (!mapa[arrayVillanos[index]._posicionY - 1][arrayVillanos[index]._posicionX].classList.contains("pilares")) {
    
                        mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexIzq1");
                        mapa[--arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.add("rexIzq1");
                    }
    
                }
    
            } else if (arrayVillanos[index]._posicionY < heroePosicionY) {
                if (arrayVillanos[index]._posicionY + 1 <= 13) {
    
                    if (!mapa[arrayVillanos[index]._posicionY + 1][arrayVillanos[index]._posicionX].classList.contains("pilares")) {
    
                        mapa[arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.remove("rexIzq1");
                        mapa[++arrayVillanos[index]._posicionY][arrayVillanos[index]._posicionX].classList.add("rexIzq1");
    
    
                    }
                }
    
            }
    
    
    
        }
    
    }
function subirNivel(){
    if(heroePosicionX==8&&heroePosicionY==0){
        let padre = document.querySelector(".pantalla");
        let borrInv = document.querySelector("#inventario");
        let borrLif = document.querySelector("life");
        let borrar = document.querySelector(".mapa");
        let creado = document.createElement("div");
        creado.classList.add("mapa");
        padre.removeChild(borrar);
        padre.appendChild(creado);
        inventario = document.createElement("div");
        heroePosicionX = 8;
        muerteRex = false;
        heroePosicionY = 1;
        inventarioStinger = false;
        mapa = new Array(15);
        arrayVillanos = new Array();
        der = 0;
        izq = 0;
        abj = 0;
        arr = 0;
        stingerX = 2;
        stingerY = 4;
        tarjetaX = 2;
        tarjetaY = 7;
        cajaX = 6;
        cajaY = 4;
        rayX = 6;
        rayY = 7;
        pilY = 3;
        pilX = 1;
        revelado = false;
        inventarioCaja=false;
        inventarioTarjeta= false;
        ray = false;
        level++;
        crearMapa();
        randomizarObjetos();
        //document.getElementById("inventario").innerHTML= 'Nivel '+level;
        pintarMapa();
        //document.getElementById("life").innerHTML='Score '+score;
            for(var m = 0;m<=numeroMomias;m++){
                anyadirRex();
            }
        }
}
function inventario2(){
    inventario.classList.add("stinger");
    document.getElementById("inventario").appendChild(inventario);
}
function gameOver(){
    alert("MUERTO");
}
window.onload = function main() {
    inventario2();
    crearMapa();
    randomizarObjetos();
    pintarMapa();
    anyadirRex();
    setInterval(movimientoV,300);

}

