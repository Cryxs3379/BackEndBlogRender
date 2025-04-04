const express = require('express');
const router = express.Router();
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articleController');

router.get('/', getAllArticles);
router.post('/', createArticle);
router.delete('/:id', deleteArticle);

module.exports = router;

