const express = require('express');
const router = express.Router();
const Historial = require('../models/Historial');

// Obtener historial completo
router.get('/', async (req, res) => {
  try {
    const historial = await Historial.find().sort({ fecha: -1 }).limit(50);
    res.json(historial);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener historial' });
  }
});

module.exports = router;
