const express = require('express');
const path = require('path');
const app = express();
const app2 = express();
const bodyParser = require('body-parser');

//Conexión MongoDB
const dbConfig = require('./MongoFallero/config/database.config');
const mongoose = require('mongoose');
const Puntuacion = require('./MongoFallero/app/models/puntuaciones.model.js');
const puntuaciones = new Puntuacion({
    idFalla:'2',
    ip:'192.123.23.2',
    puntuacion:1
});
const db = mongoose.connect(dbConfig.url);
app2.use(bodyParser.urlencoded({
    extended:true
}));

app2.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true}).then(()=>{
        console.log(" * Cargada y preparada en 2019");

    }).catch(err=>{
        console.log("Algo ha pasado...saliendo : ",err);
        process.exit();
    });

//Inserta en MongoDB,pero, no me funcionaba con app2.post ya que directamente ni intentaba entrar dentro de la función
puntuaciones.save();

app2.get('/api/',(req,res)=>{
    res.json({'mierda':'mierdaca de la buena'});
});

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'DatosAbiertos/public')));

app2.use(express.static(path.join(__dirname, 'MongoFallero/public')));
// Escuchemos en un puerto
app.listen(3000,() => {
    console.log(" * OpenData Running en http://localhost:3000");
});

app2.listen(3001,() => {
    console.log(" * MongoFallero Running en http://localhost:3001");
});

