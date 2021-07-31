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
        const bookID = parseInt(req.query.bookId);
        const email = req.query.username
        const userQuery = `SELECT id FROM users WHERE email='${email}'`
        const users = await pool.query(userQuery)
        const userID = users[0].id
        const borrowQuery = `INSERT INTO borrowed (user_id, book_id) VALUES ('${userID}', '${bookID}') `
        rows = await pool.query(borrowQuery)

        const updateBook = `UPDATE book SET count = count - 1 WHERE id='${bookID}'`
        await pool.query(updateBook);

        return res.status(200).json({
            success: true,
            data: rows,
        });
    } catch (err) {
        console.log(err);
        if (err.errno === 1062) { // unique constraint fails
            return res.send(304).json({
                success: false,
                error: "Duplicate request"
            })
        }
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

