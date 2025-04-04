const Article = require('../models/Article');

// GET /api/articulos
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ fecha: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
};

module.exports = { getAllArticles };
