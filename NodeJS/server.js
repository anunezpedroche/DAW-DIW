const express = require('express');
const path = require('path');
const app = express();
const app2 = express();

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'DatosAbiertos/public')));

app2.use(express.static(path.join(__dirname, 'MongoFallero/public')));
// Escuchemos en un puerto
app.listen(3000,() => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});

app2.listen(3001,() => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});

