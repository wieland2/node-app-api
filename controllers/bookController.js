const fs = require('fs');

// Read json file and parse into a javascript object... dirname refers to where the current file is located
const books = JSON.parse(fs.readFileSync(`${__dirname}/../data/books.json`));

exports.checkID = (req, res, next, val) => {
  console.log(val);
  if (req.params.id * 1 > books.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid',
    });
  }
  next();
};

// REQUST === GET (ALL BOOKS)

exports.getBooks = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
};

// REQUEST === GET (1 SINGLE BOOK)

exports.getBook = (req, res) => {
  // Book where book.id in books === id in req.params

  const book = books.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
};

// REQUEST === POST

exports.createBook = (req, res) => {
  console.log(req.body);
  // Create an ID for the new book
  const newId = books[books.length - 1].id + 1;

  // Create new book object and push into books array
  const newBook = Object.assign({ id: newId }, req.body);
  books.push(newBook);

  // Rewrite books.json with the new books object
  fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(books), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        book: newBook,
      },
    });
  });
};

// REQUEST === PATCH

exports.updateBook = (req, res) => {
  // Simple patch logic (not fully implemented)

  res.status(200).json({
    status: 'success',
    data: {
      book: 'Update book here...',
    },
  });
};

// REQUEST === DELETE

exports.deleteBook = (req, res) => {
  const newBooks = books.filter((el) => el.id !== req.params.id * 1);

  fs.writeFile(
    `${__dirname}/data/books.json`,
    JSON.stringify(newBooks),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
