const express = require('express');
const bookController = require('./../controllers/bookController');
// ROUTES

const router = express.Router();

router.param('id', bookController.checkID);

router
  .route('/')
  .get(bookController.getBooks)
  .post(bookController.checkBody, bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
