const express = require('express');
const { isUserAuth } = require('../controllers/isUserAuth');
const router = express.Router();

const jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {
    const token = req.header("x-access-token")
    if (!token) {
        res.json({auth: false, error: "Authentication failed"})
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({auth: false, error: "Authentication failed"})
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

router
    .route('/')
    .get(verifyJWT, isUserAuth);

module.exports = router;