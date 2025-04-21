const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  sinopsis: { type: String, required: true },
  fecha_creacion: { type: Date, required: true },
  ver_legalmente: [{ type: String }],
  ver_menos_legalmente: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Pelicula', bibliotecaSchema, 'biblioteca');

