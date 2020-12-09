const express = require('express');
const _ = require('underscore');
const app = express();
const Libros = require('../models/libros');

app.get('/libros', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Libros.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        //.populate('usuario', 'nombre email')
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrió un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de libros obtenida con éxito',
                conteo: productos.length,
                libros
            });
        });
});

app.post('/libros', (req, res) => {
    let pro = new Libros({
        clave: req.body.clave,
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        categoria: req.body.categoria,
        disponible: req.body.disponible
    });

    pro.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un libro',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Libro insertado con éxito',
            proDB
        });
    });
});

app.put("/libros/:id", function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['disponible', 'precioUni']);

    Libros.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrió un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto actualizado con éxito',
            producto: proDB
        })
    });
});

app.delete("/libros/:id", function (req, res) {
    let id = req.params.id;

    Libros.findByIdAndUpdate(id, { context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrió un error al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto eliminado con éxito',
            proDB
        });
    })
});

module.exports = app;