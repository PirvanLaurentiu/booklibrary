const express = require('express');
const { getLogin, postLogin } = require('../controllers/login');
const router = express.Router();

router
    .route('/')
    .post(postLogin);

module.exports = router;