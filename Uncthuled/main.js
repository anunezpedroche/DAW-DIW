/*-----------------------------------DEFINICIÓN VARIABLES GLOBALES------------------------------*/
var heroePosicionX=8;
var heroePosicionY=0;
var mapa = new Array(15);
for(var i = 0;i<mapa.length;i++){
    mapa[i] = new Array(21);
}


/*------------------------------------PINTA EL MAPA------------------------------------------- */
function pintarMapa(){
    for(var a=0;a<mapa.length;a++){
        for(var j=0;j<mapa[a].length;j++){
            var navMap = document.createElement("div");
            if(a==heroePosicionY&&j==heroePosicionX){
                navMap.classList.add("pabajo");
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

function movimiento(evento){

    var posAntHX = heroePosicionX;
    var posAntHY = heroePosicionY;

    switch(evento.key){
        case "s":
            //Abajo
            if(mapa[heroePosicionY+1][heroePosicionX].className.indexOf("pasillo")>=0){
                mapa[heroePosicionY][heroePosicionX].classList.remove("pabajo");
                heroePosicionY++;
                mapa[heroePosicionY][heroePosicionX].classList.remove("columna");

                mapa[heroePosicionY-1][heroePosicionX].classList.add("pasillo");
                mapa[heroePosicionY][heroePosicionX].classList.add("pabajo");
            }

            break;
            //Arriba
            case "w":
            if(mapa[heroePosicionY-1][heroePosicionX].className.indexOf("pasillo")>=0){
                mapa[heroePosicionY][heroePosicionX].classList.remove("pabajo");
                heroePosicionY--;
                mapa[heroePosicionY][heroePosicionX].classList.remove("columna");

                mapa[heroePosicionY+1][heroePosicionX].classList.add("pasillo");
                mapa[heroePosicionY][heroePosicionX].classList.add("pabajo");
            }
            break;
            //Derecha
            case "d":
            if(mapa[heroePosicionY][heroePosicionX+1].className.indexOf("pasillo")>=0){
                mapa[heroePosicionY][heroePosicionX].classList.remove("pabajo");
                heroePosicionX++;
                mapa[heroePosicionY][heroePosicionX].classList.remove("columna");

                mapa[heroePosicionY][heroePosicionX-1].classList.add("pasillo");
                mapa[heroePosicionY][heroePosicionX].classList.add("pabajo");
            }
            break;
            //Izquierda
            case "a":
            if(mapa[heroePosicionY][heroePosicionX-1].className.indexOf("pasillo")>=0){
                mapa[heroePosicionY][heroePosicionX].classList.remove("pabajo");
                heroePosicionX--;
                mapa[heroePosicionY][heroePosicionX].classList.remove("columna");

                mapa[heroePosicionY][heroePosicionX+1].classList.add("pasillo");
                mapa[heroePosicionY][heroePosicionX].classList.add("pabajo");
            }
            break;
        default:
        

    }
}

window.onload=function(){
pintarMapa();

}