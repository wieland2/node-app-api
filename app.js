const express = require('express');
const morgan = require('morgan');

const bookRouter = require('./routes/bookRoutes');

// When calling express(), it will addd various methods to the app variable
const app = express();

// MIDDLEWARE TO ADD THE DATA BODY TO THE REQUEST
app.use(morgan('dev'));
app.use(express.json());
app.use(express);
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES

app.use('/api/v1/books', bookRouter);

module.exports = app;
