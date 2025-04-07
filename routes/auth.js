const express = require('express');
const routerauth = express.Router();
const User = require('../models/User');

// Ruta de login
routerauth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      // Por ahora devolvemos el objeto usuario directamente (más adelante se usará JWT)
      res.json({ message: 'Login exitoso', user });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = routerauth;
