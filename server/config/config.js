//====================
// Puerto
//====================
process.env.PORT = process.env.PORT || 3000;

// ============================
// Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// Vencimiento del token
// ============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 2;

// ============================
// Sed de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


let urlDB;
//"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"
if (process.env.NODE_ENV !== 'dev') {
    urlDB = process.env.MONGO_URI;
} else {
    urlDB = 'mongodb://localhost:27017/cafe';
}

process.env.URLDB = urlDB;

// ============================
// Google client id
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '306407982391-95s4a0ns4oipi9dqkkavl8335vc1b6al.apps.googleusercontent.com';