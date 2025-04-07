const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas del blog
const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articulos', articleRoutes);

// ✅ Rutas de login
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes); // <--- ESTA LÍNEA FALTABA

const eventRoutes = require('./routes/events');
app.use('/api/eventos', eventRoutes);


// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`));
  })
  .catch((error) => console.error('❌ Error al conectar con MongoDB:', error));

