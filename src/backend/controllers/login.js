const dotenv = require('dotenv');
const e = require('express');
const pools = require('../database');
const pool = pools.dbPool

dotenv.config({path: '../config/config.env'})

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// @desc Login user
// @route POST /api/login
// @param email
// @param password
// @access Public
exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
    
        //check user exists
        const getQuery = `SELECT * FROM users WHERE email = '${email}'`;
        rows = await pool.query(getQuery);
        if (rows.length > 0) {
            bcrypt.compare(password, rows[0].password, (error, response) => {
                if (response) {
                    const id = rows[0].id
                    const token = jwt.sign({id}, "jwtSecret", {
                        expiresIn: 300,
                    })
                    req.session.user = rows[0].email
                    res.json({auth: true, token: token, result: rows[0].email})

                } else {
                    res.send({ success: false, error: "Wrong email/password combination!"})
                }
            })
        } else {
            res.send({success: false, error: "User doesn't exist"})
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
};