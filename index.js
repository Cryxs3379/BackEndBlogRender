const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🔌 Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`));
  })
  .catch((error) => console.error('❌ Error al conectar con MongoDB:', error));

// 📚 Rutas del blog
const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articulos', articleRoutes);

// 🗝️ Rutas de login (usuarios normales)
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// 📖 Rutas de login para biblioteca
const libraryAuthRoutes = require('./routes/libraryAuth');
app.use('/api/auth', libraryAuthRoutes); // endpoint: /api/auth/library

// 📅 Eventos (calendario)
const eventRoutes = require('./routes/events');
app.use('/api/eventos', eventRoutes);

// 🕓 Historial
const historialRoutes = require('./routes/historial');
app.use('/api/historial', historialRoutes);

// 🎬 Biblioteca (Películas)
const bibliotecaRoutes = require('./routes/bibliotecaRoutes');
app.use('/api/peliculas', bibliotecaRoutes);