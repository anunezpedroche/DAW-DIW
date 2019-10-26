import Rex from './js/rex.js';
/*
-----------------------------------------TODO LIST-------------------------------------------
1- REVELAR COLUMNAS                     X
2- RANDOMIZAR OBJETOS
3- RANDOMIZAR REX
4- SEPARAR PINTAR REX DE MOVER REX
5- AÑADIR OTRO REX/RAY
6- MEJORAR INTERFAZ                     X
7- LIMPIAR CÓDIGO

-----------------------------------DEFINICIÓN VARIABLES GLOBALES------------------------------*/
var arrayVillanos = new Array();
var heroePosicionX = 8;
var muerteRex = false;
var heroePosicionY = 0;
let inventarioStinger = false;
var rexPosicionX = 20;
var rexPosicionY = 14;
var mapa = new Array(15);
var der = 0;
var izq = 0;
var abj = 0;
var arr = 0;
var rder = 0;
var rizq = 0;
var rabj = 0;
var rarr = 0;
var count = 0;
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
// DEFINICIÓN ARRAY MAPA
for (var i = 0; i < mapa.length; i++) {
    mapa[i] = new Array(21);
}
function randomizarObjetos(){
    let objetos = new Array();
    
    
    for (fil = 0; fil < 5; fil++) {
        for (col = 0; col < 6; col++) {
            stingerY = pilY+1;
            stingerX = pilX+1;
            pilX += 4;
        }
        pilX = 1;
        pilY += 3;
    }
}

/*------------------------------------PINTA EL MAPA------------------------------------------- */
function pintarMapa() {

    for (var a = 0; a < mapa.length; a++) {
        for (var j = 0; j < mapa[a].length; j++) {
            var navMap = document.createElement("div");
            if (a == heroePosicionY && j == heroePosicionX) {
                navMap.classList.add("der1");
            }
            if (a == 0 || a == 1 && j != 8) {
                navMap.classList.add("muro");
            }
            if (a % 3 == 2 || j % 4 == 0 && a != 1 && a != 0 || j == 8 && mapa[3][4] != true) {
                navMap.classList.add("pasillo");
            } else if (a != 0 && a != 1) {
                navMap.classList.add("pilares");
            }

            document.getElementById("mapa").appendChild(navMap);
            mapa[a][j] = navMap;
            document.onkeydown = movimiento;
        }
    }

}

/*-------------------------------------MOVIMIENTO DEL PERSONAJE----------------------------------------------*/

function movimiento(evento) {

    var posAntHX = heroePosicionX;
    var posAntHY = heroePosicionY;

    switch (evento.key) {

        case "s":
            //Abajo
            if (mapa[heroePosicionY + 1][heroePosicionX].className.indexOf("pasillo") >= 0) {
                //Elimina posición en Y+
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
            columnas();
            break;
        //Arriba
        case "w":
            if (mapa[heroePosicionY - 1][heroePosicionX].className.indexOf("pasillo") >= 0) {
                //Elimina posición en Y+
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
            columnas();

            break;
        //Derecha
        case "d":
            if (mapa[heroePosicionY][heroePosicionX + 1].className.indexOf("pasillo") >= 0) {
                //Elimina posición en Y+
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
            columnas();
            break;
        //Izquierda
        case "a":
            if (mapa[heroePosicionY][heroePosicionX - 1].className.indexOf("pasillo") >= 0) {
                //Elimina posición en Y+
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
            columnas();
            break;
        default:
            break;



    }
}

/*-------------------------------------------MOVIMIENTO METAL GEAR REX------------------------------------------------*/

/*function movimientoRex() {

    if (muerteRex == true) {
        inventarioStinger = false;

        borrarRex();
    } else {
        var cas = Math.floor(Math.random() * 4);
        if (cas == 0) {
            if (mapa[rexPosicionY][rexPosicionX - 1].className.indexOf("pasillo") >= 0) {

                borrarRex();
                //Elimina posición en X-
                rexPosicionX--;
                
                if (rizq == 0) {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                    rizq = 1;
                } else {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq2");
                    rizq = 0;
                }

            }
        } else if (cas == 1) {
            if (mapa[rexPosicionY][rexPosicionX + 1].className.indexOf("pasillo") >= 0) {

                borrarRex();
                rexPosicionX++;
                if (rder == 0) {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexDer1");
                    rder = 1;
                } else {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexDer2");
                    rder = 0;
                }
            }
        } else if (cas == 2) {
            if (mapa[rexPosicionY - 1][rexPosicionX].className.indexOf("pasillo") >= 0) {

                borrarRex();

                rexPosicionY--;
                if (rarr == 0) {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexDer1");
                    rarr = 1;
                } else {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                    rarr = 0;
                }

            }
        } else if (cas == 3) {
            if (mapa[rexPosicionY + 1][rexPosicionX].className.indexOf("pasillo") >= 0) {

                borrarRex();
                rexPosicionY++;

                if (rabj == 0) {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                    rabj = 1;
                } else {
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexDer1");
                    rabj = 0;
                }
            }
        }
        if (heroePosicionX == rexPosicionX && heroePosicionY == rexPosicionY && inventarioStinger == true) {
            muerteRex = true;
        }

    }



}
*/

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
                if (stingerY == pilY + 1 && stingerX == pilX + 1) {
                    mapa[pilY + 1][pilX + 1].classList.add("stinger");
                    inventarioStinger = true;
                    console.log(inventarioStinger);
                }
                if (tarjetaY == pilY + 1 && tarjetaX == pilX + 1) {
                    mapa[pilY + 1][pilX + 1].classList.add("tarjeta");

                }
                if (cajaY == pilY + 1 && cajaX == pilX + 1) {
                    mapa[pilY + 1][pilX + 1].classList.add("caja");

                }
                if (rayY == pilY + 1 && rayX == pilX + 1) {
                    mapa[pilY + 1][pilX + 1].classList.add("ray");

                }

            }
            pilX += 4;
        }
        pilX = 1;
        pilY += 3;
    }
}

function borrarRex(){
    mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq1");
                mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq2");
                mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer1");
                mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer2");
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

        //arrayVillanos[index]._posicionY;
        //arrayVillanos[index]._posicionX;

        //console.log("-x-" + x + "-y-" + y);

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


window.onload = function () {
    pintarMapa();
    anyadirRex();
    //setInterval(movimientoV,300);
    

}

