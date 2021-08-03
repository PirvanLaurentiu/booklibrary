const dotenv = require('dotenv');
const pools = require('../database');
const pool = pools.dbPool

dotenv.config({path: '../config/config.env'})

// @desc Get books of type bookType
// @route GET /api/searchBooks
// @param searchTerm
// @param bookType
// @access Public
exports.getSearchBooks = async (req, res, next) => {
    try {
        const bookType = req.query.bookType;
        const searchTerm = req.query.searchTerm || "";
        const query = `SELECT * FROM book WHERE type='${bookType}' AND title LIKE '%${searchTerm}%'`
        console.log(`query: ${query}`)
        const rows = await pool.query(query);
        return res.status(200).json({
            success: true,
            data: rows,
        });
    } catch (err) {
        console.log(err);
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}