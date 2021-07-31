const dotenv = require('dotenv');
const pools = require('../database');
const pool = pools.dbPool;

// @desc Login user
// @route GET /api/isUserAuth
// @param user
// @access Public
exports.isUserAuth = async (req, res, next) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
};