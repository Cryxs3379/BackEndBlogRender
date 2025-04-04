const express = require('express');
const router = express.Router();
const { getAllArticles } = require('../controllers/articleController');

router.get('/', getAllArticles);

module.exports = router;
