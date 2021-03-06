const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let prestamosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Su nombre es obligatorio'],
      
    },
    email: {
        type: String,
        required: [true, ' Su email es obligatorio'],
    },
    telefono: {
        type: Number,
        ref: 'Telefono'
    },
    libro: {
        type: String,
        required: [true, ' Su libro es obligatorio']
    }
});

module.exports = mongoose.model('Prestamos', prestamosSchema);