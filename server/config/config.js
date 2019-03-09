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
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
// Sed de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


let urlDB;

if (process.env.NODE_ENV !== 'dev') {
    urlDB = process.env.MONGO_URI;
} else {
    urlDB = 'mongodb://localhost:27017/cafe';
}

process.env.URLDB = urlDB;