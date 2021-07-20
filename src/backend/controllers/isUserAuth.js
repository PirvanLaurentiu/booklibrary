const dotenv = require('dotenv');
const pools = require('../database');
const pool = pools.dbPool;

exports.isUserAuth = async(req, res) => {
    res.send("authenticated")
}