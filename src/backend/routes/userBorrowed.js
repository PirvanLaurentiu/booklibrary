const express = require('express');
const router = express.Router();
const { userBorrowed } = require('../controllers/userBorrowed')

router
    .route('/')
    .get(userBorrowed);

module.exports = router;