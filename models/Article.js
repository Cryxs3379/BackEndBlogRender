const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  introduccion: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  autor: { type: String, required: true },
  imagenes: [{ type: String }]
});

module.exports = mongoose.model('Article', articleSchema, 'Artículos');


