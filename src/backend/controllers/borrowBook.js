const dotenv = require('dotenv');
const pools = require('../database');
const pool = pools.dbPool

dotenv.config({path: '../config/config.env'})

// @desc Get one book from books stock
// @route POST /api/borrowBook
// @param bookId
// @access Public
exports.borrowBook = async (req, res, next) => {
    try {
        const bookId = parseInt(req.query.bookId);
        const query = `UPDATE book SET count = count - 1 WHERE id=${bookId}`
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