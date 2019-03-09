require('./config/config');

const express = require('express');
//"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// Configuración global de rutas
app.use(require('../routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
})

//JPvqED6Kge3PiVap