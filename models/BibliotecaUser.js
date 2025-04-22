const mongoose = require('mongoose');

const bibliotecaUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: String,
  apellido: String,
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BibliotecaUser', bibliotecaUserSchema, 'usuariosbiblioteca');

