const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Biblioteca'); // ✔️ Coincide con el nombre del archivo


// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

// Agregar nueva película
router.post('/', async (req, res) => {
  try {
    const nuevaPelicula = new Pelicula(req.body);
    await nuevaPelicula.save();
    res.status(201).json(nuevaPelicula);
  } catch (err) {
    res.status(400).json({ error: 'Error al guardar película', detalle: err });
  }
});

module.exports = router;

