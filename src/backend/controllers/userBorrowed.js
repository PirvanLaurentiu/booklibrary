const dotenv = require('dotenv');
const pools = require('../database');
const pool = pools.dbPool

dotenv.config({path: '../config/config.env'})

// @desc Get one book from books stock
// @route GET /api/userBorrowed
// @param bookId
// @access Public
exports.userBorrowed = async (req, res, next) => {
    try {
        const rowsPerPage = parseInt(req.query.rowsPerPage) || 15;
        const page = parseInt(req.query.page) || 0;
        const skip = page * rowsPerPage;
        const limit = skip + ',' + rowsPerPage;
        const email = req.query.username

        const userQuery = `SELECT id FROM users WHERE email='${email}'`
        console.log(userQuery)
        const users = await pool.query(userQuery)
        const userID = users[0].id

        const countBorrowQuery = `SELECT COUNT(*) as numRows FROM book INNER JOIN borrowed ON book.id = borrowed.book_id INNER JOIN users ON users.id = borrowed.user_id WHERE users.id = '${userID}' `
        countBorrowResult = await pool.query(countBorrowQuery)
        const numRows = countBorrowResult[0].numRows;

        const query = `SELECT * FROM book INNER JOIN borrowed ON book.id = borrowed.book_id INNER JOIN users ON users.id = borrowed.user_id WHERE users.id = '${userID}' LIMIT ${limit}`
        const rows = await pool.query(query)
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