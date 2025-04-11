const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Historial = require('../models/Historial');

// Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Event.find();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
});

// Crear nuevo evento
router.post('/', async (req, res) => {
  const { title, description, start, end, userId, email, nombre, apellido } = req.body;

  try {
    const nuevoEvento = new Event({
      title,
      description,
      start,
      end,
      createdBy: userId,
      createdByEmail: email
    });

    await nuevoEvento.save();

    if (nombre && apellido) {
      await Historial.create({
        usuarioId: userId,
        nombre,
        apellido,
        accion: 'creó el evento',
        eventoTitulo: title
      });
    }

    res.status(201).json(nuevoEvento);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear evento', error: err.message });
  }
});

// Actualizar evento existente con detección de movimiento
router.put('/:id', async (req, res) => {
  const { title, description, start, end, userId, nombre, apellido } = req.body;

  try {
    const eventoOriginal = await Event.findById(req.params.id);

    if (!eventoOriginal) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    const fueMovido =
      eventoOriginal.start.toISOString() !== new Date(start).toISOString() ||
      eventoOriginal.end.toISOString() !== new Date(end).toISOString();

    const fueEditado =
      eventoOriginal.title !== title || eventoOriginal.description !== description;

    const eventoActualizado = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, start, end },
      { new: true }
    );

    if (nombre && apellido) {
      let accion = 'editó el evento';
      if (fueMovido && !fueEditado) {
        accion = 'movió el evento';
      }

      await Historial.create({
        usuarioId: userId,
        nombre,
        apellido,
        accion,
        eventoTitulo: title
      });
    }

    res.json(eventoActualizado);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar evento', error: err.message });
  }
});

// Eliminar evento
router.delete('/:id', async (req, res) => {
  const { userId, nombre, apellido } = req.body;

  try {
    const eventoEliminado = await Event.findByIdAndDelete(req.params.id);

    if (!eventoEliminado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    if (nombre && apellido) {
      await Historial.create({
        usuarioId: userId,
        nombre,
        apellido,
        accion: 'eliminó el evento',
        eventoTitulo: eventoEliminado.title
      });
    }

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar evento', error: err.message });
  }
});

module.exports = router;
