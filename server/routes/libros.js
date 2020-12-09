const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Libros = require('../models/libros');

app.get('/libros', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Libros.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de libros obtenida con exito',
                conteo: libros.length,
                libros
            });
        });
});

app.post('/libros', function(req, res) {
    let body = req.body;
    let usr = new Libros({
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        disponible: body.disponible
    });

    usr.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Libro insertado con exito',
            usrDB
        });
    });
});

app.put('/libros/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'clave']);

    Libros.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Libro actualizado con exito',
                libros: usrDB
            });
        });
});

app.delete('/libros/:id', function(req, res) {
   

    let id = req.params.id;

    Libros.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Libro eliminado con exito',
            usrDB
        });
    });
});

module.exports = app;