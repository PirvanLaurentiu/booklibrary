const dotenv = require('dotenv');
const pools = require('../database');
const pool = pools.dbPool;

const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config({path: '../config/config.env'})

// @desc Register user, save it to db
// @route POST /api/register
// @param email
// @param password
// @access Public
exports.register = async (req, res, next) => {
    try {
        console.log(req);
        const email = req.body.email;
        const password = req.body.password;
    
        //check user exists
        console.log(`Querying email '${email}'`)
        const getQuery = `SELECT id FROM users WHERE email = '${email}'`;
        rows = await pool.query(getQuery);
        if (rows.length > 0) {
            return res.status(409).json({
                success: false,
                error: "User already exists"
            })
        }
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err)
            }
            const postQuery = `INSERT INTO users (email, password) VALUES ('${email}', '${hash}')`
            pool.query(postQuery)
            return res.status(200).json({
                success: true
            })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}