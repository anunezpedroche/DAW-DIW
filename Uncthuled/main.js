/*-----------------------------------DEFINICIÓN VARIABLES GLOBALES------------------------------*/
var heroePosicionX=8;
var heroePosicionY=0;
var rexPosicionX=8;
var rexPosicionY=11;
var mapa = new Array(15);
var der = 0;
var izq = 0;
var abj = 0;
var arr = 0;
var count = 0;
var stingerX = 2;
var stingerY = 4;
var tarjetaX = 2;
var tarjetaY = 7;
var cajaX = 6;
var cajaY = 4;
var rayX = 6;
var rayY = 7;
for(var i = 0;i<mapa.length;i++){
    mapa[i] = new Array(21);
}


/*------------------------------------PINTA EL MAPA------------------------------------------- */
function pintarMapa(){
    for(var a=0;a<mapa.length;a++){
        for(var j=0;j<mapa[a].length;j++){
            var navMap = document.createElement("div");
            if(a==heroePosicionY&&j==heroePosicionX){
                navMap.classList.add("der1");
            }
            if(a%3==2||j%4==0&&a!=1&&a!=0||j==8&&mapa[3][4]!=true){
                navMap.classList.add("pasillo");
            }else{
                navMap.classList.add("pilares");
            } 

            document.getElementById("mapa").appendChild(navMap);
            mapa[a][j] = navMap;
            document.onkeydown = movimiento;
        }
    }
    
    columnas(); 
    movimientoRex(); 
      
}

/*-------------------------------------MOVIMIENTO DEL PERSONAJE----------------------------------------------*/

function movimiento(evento){

    var posAntHX = heroePosicionX;
    var posAntHY = heroePosicionY;

    switch(evento.key){
        case "s":
            //Abajo
            if(mapa[heroePosicionY+1][heroePosicionX].className.indexOf("pasillo")>=0){
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

                mapa[heroePosicionY-1][heroePosicionX].classList.add("pisado");
                //Movimiento GRÁFICO del personaje ABAJO
                if(abj==0){
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq1");
                    abj=1;
                }else if(abj==1){
                    mapa[heroePosicionY][heroePosicionX].classList.add("der1");
                    abj=0;
                }
            }

            break;
            //Arriba
            case "w":
            if(mapa[heroePosicionY-1][heroePosicionX].className.indexOf("pasillo")>=0){
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
                mapa[heroePosicionY][heroePosicionX].classList.remove("columna");

                mapa[heroePosicionY+1][heroePosicionX].classList.add("pisado");
                //Movimiento GRÁFICO del personaje ARRIBA
                if(arr==1){
                    mapa[heroePosicionY][heroePosicionX].classList.add("der1");
                    arr=0;
                }else if(arr==0){
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq1");
                    arr=1;
                }
            }
            break;
            //Derecha
            case "d":
            if(mapa[heroePosicionY][heroePosicionX+1].className.indexOf("pasillo")>=0){
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
                mapa[heroePosicionY][heroePosicionX].classList.remove("columna");
                mapa[heroePosicionY][heroePosicionX-1].classList.add("pisado");

                //Movimiento GRÁFICO del personaje DERECHA
                if(der==1){
                    mapa[heroePosicionY][heroePosicionX].classList.add("der1");
                    der=0;
                }else if(der==0){
                    mapa[heroePosicionY][heroePosicionX].classList.add("der2");
                    der=1;
                }
            }
            break;
            //Izquierda
            case "a":
            if(mapa[heroePosicionY][heroePosicionX-1].className.indexOf("pasillo")>=0){
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
                mapa[heroePosicionY][heroePosicionX].classList.remove("columna");

                mapa[heroePosicionY][heroePosicionX+1].classList.add("pisado");
                //Movimiento GRÁFICO del personaje IZQUIERDA
                if(izq==1){
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq1");
                    izq=0;
                }else if(izq==0){
                    mapa[heroePosicionY][heroePosicionX].classList.add("izq2");
                    izq=1;
                }
            }
            break;
        default:

        

    }
}

/*-------------------------------------------MOVIMIENTO METAL GEAR REX------------------------------------------------*/

function movimientoRex(){
    

    while(rexPosicionX!=heroePosicionX||rexPosicionY!=heroePosicionY){
        var cas = Math.floor(Math.random()*4);
        console.log(cas);
        if(mapa[rexPosicionY][rexPosicionX+1]==""){
            rexPosicionX--;
            console.log("Hola");
        }
        if(mapa[rexPosicionY][rexPosicionX-1]==""){
            rexPosicionX++;
            
            console.log("Hola");
        }
        if(mapa[rexPosicionY+1][rexPosicionX]==""){
            rexPosicionY--;

            console.log("Hola");
        }
        if(mapa[rexPosicionY-1][rexPosicionX]==""){
            rexPosicionY++;

            console.log("Hola");
        }
        if (cas==0){
            if(mapa[rexPosicionY][rexPosicionX-1].className.indexOf("pasillo")>=0){
                //Elimina posición en Y+

                rexPosicionX--;

                mapa[rexPosicionY][rexPosicionX-1].classList.add("pasillo");
                //Movimiento GRÁFICO del personaje IZQUIERDA
                if(izq==1){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                    izq=0;
                }else if(izq==0){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq2");
                    izq=1;
                }
            }
        }else if(cas==1){
            if(mapa[rexPosicionY][rexPosicionX+1].className.indexOf("pasillo")>=0){
                //Elimina posición en Y+

                rexPosicionX++;
                mapa[rexPosicionY][rexPosicionX].classList.remove("columna");

                mapa[rexPosicionY][rexPosicionX+1].classList.add("pasillo");
                //Movimiento GRÁFICO del personaje IZQUIERDA
                if(izq==1){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                    izq=0;
                }else if(izq==0){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq2");
                    izq=1;
                }
            }
        }else if(cas==2){
            if(mapa[rexPosicionY-1][rexPosicionX].className.indexOf("pasillo")>=0){
                //Elimina posición en Y+

                rexPosicionY--;

                mapa[rexPosicionY-1][rexPosicionX].classList.add("pasillo");
                //Movimiento GRÁFICO del personaje IZQUIERDA
                if(izq==1){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                    izq=0;
                }else if(izq==0){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq2");
                    izq=1;
                }
            }
        }else if (cas==3){
            if(mapa[rexPosicionY+1][rexPosicionX].className.indexOf("pasillo")>=0){
                //Elimina posición en Y+

                rexPosicionY++;

                mapa[rexPosicionY+1][rexPosicionX].classList.add("pasillo");
                //Movimiento GRÁFICO del personaje IZQUIERDA
                if(izq==1){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                    izq=0;
                }else if(izq==0){
                    mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq2");
                    izq=1;
                }
            }
        }
        }
    }

    function columnas(){
        //--------------------------------MUESTRA STINGER---------------------------------
        mapa[stingerY-1][stingerX].classList.remove("columna");
        mapa[stingerY-1][stingerX+1].classList.remove("columna");
        mapa[stingerY-1][stingerX-1].classList.remove("columna");
        mapa[stingerY][stingerX+1].classList.remove("columna");
        mapa[stingerY][stingerX-1].classList.remove("columna");
        mapa[stingerY][stingerX].classList.remove("columna");

        mapa[stingerY][stingerX].classList.add("stinger");
        mapa[stingerY][stingerX].classList.add("revelada");
        mapa[stingerY-1][stingerX].classList.add("revelada");
        mapa[stingerY-1][stingerX+1].classList.add("revelada");
        mapa[stingerY-1][stingerX-1].classList.add("revelada");
        mapa[stingerY][stingerX+1].classList.add("revelada");
        mapa[stingerY][stingerX-1].classList.add("revelada");

        //------------------------------MUESTRA TARJETA---------------------------------------
        mapa[tarjetaY-1][tarjetaX].classList.remove("columna");
        mapa[tarjetaY-1][tarjetaX+1].classList.remove("columna");
        mapa[tarjetaY-1][tarjetaX-1].classList.remove("columna");
        mapa[tarjetaY][tarjetaX+1].classList.remove("columna");
        mapa[tarjetaY][tarjetaX-1].classList.remove("columna");
        mapa[tarjetaY][tarjetaX].classList.remove("columna");

        mapa[tarjetaY][tarjetaX].classList.add("tarjeta");
        mapa[tarjetaY][tarjetaX].classList.add("revelada");
        mapa[tarjetaY-1][tarjetaX].classList.add("revelada");
        mapa[tarjetaY-1][tarjetaX+1].classList.add("revelada");
        mapa[tarjetaY-1][tarjetaX-1].classList.add("revelada");
        mapa[tarjetaY][tarjetaX+1].classList.add("revelada");
        mapa[tarjetaY][tarjetaX-1].classList.add("revelada");

        //--------------------------------MUESTRA CAJA CARTÓN----------------------------------
        mapa[cajaY-1][cajaX].classList.remove("columna");
        mapa[cajaY-1][cajaX+1].classList.remove("columna");
        mapa[cajaY-1][cajaX-1].classList.remove("columna");
        mapa[cajaY][cajaX+1].classList.remove("columna");
        mapa[cajaY][cajaX-1].classList.remove("columna");
        mapa[cajaY][cajaX].classList.remove("columna");

        mapa[cajaY][cajaX].classList.add("caja");
        mapa[cajaY][cajaX].classList.add("revelada");
        mapa[cajaY-1][cajaX].classList.add("revelada");
        mapa[cajaY-1][cajaX+1].classList.add("revelada");
        mapa[cajaY-1][cajaX-1].classList.add("revelada");
        mapa[cajaY][cajaX+1].classList.add("revelada");
        mapa[cajaY][cajaX-1].classList.add("revelada");

        //-------------------------------MUESTRA OTRO METAL GEAR--------------------------------
        mapa[rayY-1][rayX].classList.remove("columna");
        mapa[rayY-1][rayX+1].classList.remove("columna");
        mapa[rayY-1][rayX-1].classList.remove("columna");
        mapa[rayY][rayX+1].classList.remove("columna");
        mapa[rayY][rayX-1].classList.remove("columna");
        mapa[rayY][rayX].classList.remove("columna");

        mapa[rayY][rayX].classList.add("ray");
        mapa[rayY][rayX].classList.add("revelada");
        mapa[rayY-1][rayX].classList.add("revelada");
        mapa[rayY-1][rayX+1].classList.add("revelada");
        mapa[rayY-1][rayX-1].classList.add("revelada");
        mapa[rayY][rayX+1].classList.add("revelada");
        mapa[rayY][rayX-1].classList.add("revelada");
    }

window.onload=function(){
    pintarMapa();
}