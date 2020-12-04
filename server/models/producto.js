const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },
    categoria: {
        type: String,
        ref: 'Categoria'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: String,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Producto', productoSchema);