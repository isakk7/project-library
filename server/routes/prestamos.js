const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Prestamo = require('../models/prestamos');

app.get('/prestamos', function (req, res){
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Prestamo.find({estado: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al listar los prestamos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'prestamos listados con exito',
                conteo: prestamos.length,
                prestamos
            });
        });
});

app.post('/prestamos', function (req, res) {
    let body = req.body;
    let usr = new prestamos({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        libro: req.body.libro,
    });

    usr.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un prestamo',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Prestamo insertadO con exito',
            usrDB
        });
    });
});

app.put('/prestamo/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email']);

    Prestamos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
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
            msg: 'La prestamo fue actualizado con exito',
            prestamos: usrDB
        });
    });
});

app.delete('/prestamo/:id', function(req, res) {
    let id = req.params.id;

    Prestamos.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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