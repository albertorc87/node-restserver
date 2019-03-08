//====================
// Puerto
//====================
process.env.PORT = process.env.PORT || 3000;

// ============================
// Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV !== 'dev') {
    urlDB = 'mongodb+srv://katon:JPvqED6Kge3PiVap@cluster0-baofm.mongodb.net/cafe';
} else {
    urlDB = 'mongodb://localhost:27017/cafe';
}

process.env.URLDB = urlDB;