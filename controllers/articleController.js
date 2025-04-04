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
// Crear artículo
const createArticle = async (req, res) => {
  try {
    const nuevoArticulo = new Article(req.body);
    const saved = await nuevoArticulo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el artículo' });
  }
};

// Eliminar artículo
const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Artículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el artículo' });
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle
};
