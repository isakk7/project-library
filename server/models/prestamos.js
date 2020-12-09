const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
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
        default: true
    }
});

module.exports = mongoose.model('Prestamo', productoSchema);