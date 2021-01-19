const dotenv = require('dotenv');
const pools = require('../database');
const pool = pools.dbPool

dotenv.config({path: '../config/config.env'})

// @desc Get books of type bookType
// @route GET /api/books
// @param page Page - page number
// @param rowsPerPage - number of rows per page 
// @access Public
exports.getBooks = async (req, res, next) => {
    try {
        const rowsPerPage = parseInt(req.query.rowsPerPage) || 15;
        const page = parseInt(req.query.page) || 0;
        const bookType = req.query.bookType;
        const skip = page * rowsPerPage;
        const limit = skip + ',' + rowsPerPage;
        const countQuery = `SELECT count(*) as numRows FROM book WHERE type='${bookType}'`;
        const result = await pool.query(countQuery);
        const numRows = result[0].numRows;
        const query = `SELECT * FROM book WHERE type='${bookType}' LIMIT ${limit}`
        console.log(`query: ${query}`)
        const rows = await pool.query(query);
        return res.status(200).json({
            success: true,
            count: rows.length,
            paginationCount: numRows,
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