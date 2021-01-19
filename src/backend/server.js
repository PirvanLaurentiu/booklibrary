  
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const bodyParser = require('body-parser')
dotenv.config({path: 'config/config.env'});

// load api routes
const books = require('./routes/books');
const borrowBook = require('./routes/borrowBook');

// init app
const app = express();
const PORT = process.env.PORT || 5000;

// use api routes
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/api/books', books);
app.use('/api/borrowBook', borrowBook);

// run app
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));