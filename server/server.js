require('./config/config');

const express = require('express');
//"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"
const mongoose = require('mongoose');
const path = require('path');

const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyPraser.json());

// habilitar la carpeta public

app.use(express.static(path.resolve(__dirname, '../public')));

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