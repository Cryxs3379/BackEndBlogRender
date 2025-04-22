const express = require('express');
const router = express.Router();
const BibliotecaUser = require('../models/BibliotecaUser');

router.post('/library', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await BibliotecaUser.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Error en login de biblioteca:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
