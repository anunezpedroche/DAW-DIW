/*-----------------------------------DEFINICIÓN VARIABLES GLOBALES------------------------------*/
var heroePosicionX=8;
var muerteRex=false;
var heroePosicionY=0;
var inventarioStinger=false;
var rexPosicionX=8;
var rexPosicionY=11;
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
    break;

        

    }
}

/*-------------------------------------------MOVIMIENTO METAL GEAR REX------------------------------------------------*/

function movimientoRex(){
    
   if(muerteRex==true){
       inventarioStinger = false;

       mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq1");
       mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq2");
       mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer1");
       mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer2");    
   }else{
    var cas = Math.floor(Math.random()*4);
    if (cas==0){
        if(mapa[rexPosicionY][rexPosicionX-1].className.indexOf("pasillo")>=0){
    
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq2");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer2");
            //Elimina posición en X-
            rexPosicionX--;
            
            if(rizq==0){
                mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                rizq=1;
            }else{
                mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq2");
                rizq=0;
            }
            
        }
    }else if(cas==1){
        if(mapa[rexPosicionY][rexPosicionX+1].className.indexOf("pasillo")>=0){
         
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq2");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer2");

            rexPosicionX++;
            if(rder==0){
                mapa[rexPosicionY][rexPosicionX].classList.add("rexDer1");
                rder=1;
            }else{
                mapa[rexPosicionY][rexPosicionX].classList.add("rexDer2");
                rder=0;
            }
        }
    }else if(cas==2){
        if(mapa[rexPosicionY-1][rexPosicionX].className.indexOf("pasillo")>=0){
    
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq2");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer2");

            rexPosicionY--;
            if(rarr==0){
                mapa[rexPosicionY][rexPosicionX].classList.add("rexDer1");
                rarr=1;
            }else{
                mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                rarr=0;
            }
            
        }
    }else if (cas==3){
        if(mapa[rexPosicionY+1][rexPosicionX].className.indexOf("pasillo")>=0){
     
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexIzq2");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer1");
            mapa[rexPosicionY][rexPosicionX].classList.remove("rexDer2");
            rexPosicionY++;
            
            if(rabj==0){
                mapa[rexPosicionY][rexPosicionX].classList.add("rexIzq1");
                rabj=1;
            }else{
                mapa[rexPosicionY][rexPosicionX].classList.add("rexDer1");
                rabj=0;
            }
        }
    }
    if(heroePosicionX==rexPosicionX&&heroePosicionY==rexPosicionY&&inventarioStinger==true){
        muerteRex = true;
        
    }
    
   }
    

 
    }

    function columnas(){
        //--------------------------------MUESTRA STINGER---------------------------------
        if(mapa[stingerY+1][stingerX].className.indexOf("pisado")>=0){
            
    
            mapa[stingerY][stingerX].classList.add("stinger");
            mapa[stingerY][stingerX].classList.add("revelada");
            mapa[stingerY-1][stingerX].classList.add("revelada");
            mapa[stingerY-1][stingerX+1].classList.add("revelada");
            mapa[stingerY-1][stingerX-1].classList.add("revelada");
            mapa[stingerY][stingerX+1].classList.add("revelada");
            mapa[stingerY][stingerX-1].classList.add("revelada");
            inventarioStinger=true;
        }


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
    setInterval(columnas,10);
        setInterval(movimientoRex,300);   
    
}