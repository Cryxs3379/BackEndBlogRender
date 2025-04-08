const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  accion: { type: String, required: true },
  eventoTitulo: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Historial', historialSchema, "Historial");
