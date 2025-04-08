const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  role: { type: String, enum: ['viewer', 'editor', 'admin'], default: 'viewer' }
});

module.exports = mongoose.model('User', userSchema, 'Usuarios');
