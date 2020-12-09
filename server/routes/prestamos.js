const express = require('express');
const _ = require('underscore');
const app = express();
const prestamo = require('../models/prestamos');

app.get('/prestamo', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    prestamo.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('nombre', 'email ')
        .exec((err, categorias) => {
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

app.post('/prestamos', (req, res) => {
    let cat = new prestamo({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        libro: req.body.libro,
    });

    cat.save((err, catDB) => {
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
            catDB
        });
    });
});

app.put('/prestamo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email','telefono','libro']);

    prestamos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
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
            catDB
        });
    });
});

app.delete('/prestamo/:id', (req, res) => {
    let id = req.params.id;

    prestamos.findByIdAndRemove(id, { context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El prestamo fue eliminado con exito',
            catDB
        });
    });
});

module.exports = app;