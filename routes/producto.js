const express = require('express');

const { verificaToken } = require('../server/middlewares/autentication');

let app = express();
let Producto = require('../models/producto');

//
// Obtener productos
//
app.get('/productos', verificaToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    Producto.find()
        .skip(from)
        .limit(limit)
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                productos
            });


        });
});
//
// Producto por id
//
app.get('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: 'Producto no encontrado'
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });


        });
});


//
// Buscar productos
//
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                producto: productos
            });
        })
});

//
// Crear un producto
//
app.post('/productos', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.id_categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        res.status(201).json({ ok: true, producto: productoDB });

    });
});
//
// Actualizar un producto
//
app.put('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        disponible: body.disponible,
        descripcion: body.descripcion
    }

    Producto.findByIdAndUpdate(id, descProducto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: 'Producto no encontrado'
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });
});
//
// Actualizar un producto
//
app.delete('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let descProducto = {
        disponible: false
    }

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: 'Producto no encontrado'
            });
        }

        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });
        });

    });
});


module.exports = app;