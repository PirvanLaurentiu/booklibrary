const express = require('express');
const router = express.Router();
const { getSearchBooks } = require('../controllers/searchBooks')

router
    .route('/')
    .get(getSearchBooks);

module.exports = router;