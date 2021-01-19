const express = require('express');
const router = express.Router();
const { borrowBook } = require('../controllers/borrowBook')

router
    .route('/')
    .post(borrowBook);

module.exports = router;