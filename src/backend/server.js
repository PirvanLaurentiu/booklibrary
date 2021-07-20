  
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");

dotenv.config({path: 'config/config.env'});

// load api routes
const books = require('./routes/books');
const borrowBook = require('./routes/borrowBook');
const register = require('./routes/register');
const login = require('./routes/login');
const isUserAuth = require('./routes/isUserAuth');

// init app
const app = express();
const PORT = process.env.PORT || 5000;

// use api routes
app.use(cors({
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        }
    })
)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/api/books', books);
app.use('/api/borrowBook', borrowBook);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/isUserAuth', isUserAuth);

// run app
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));