const express = require('express');
const routerauth = express.Router();
const User = require('../models/User');

routerauth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      const { _id, nombre, apellido, email, role, fechaCreacion } = user;
      res.json({
        message: 'Login exitoso',
        user: { _id, nombre, apellido, email, role, fechaCreacion }
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = routerauth;
