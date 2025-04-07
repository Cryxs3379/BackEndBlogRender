const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

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
  const { title, start, end, userId } = req.body;

  try {
    const nuevoEvento = new Event({ title, start, end, createdBy: userId });
    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear evento', error: err.message });
  }
});

module.exports = router;
