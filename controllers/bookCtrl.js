let books = [
  {
    id: 1,
    name: "HTML & CSS",
    price: 400,
  },
  {
    id: 2,
    name: "JavaScript",
    price: 800,
  },
  {
    id: 3,
    name: "React JS",
    price: 1000,
  },
];

const createBook = (req, res) => {
  let newID = books[books.length - 1].id + 1;
  //   let newID = books.length + 1;
  let newBook = {
    id: newID,
    ...req.body,
  };

  books.push(newBook);

  res.status(201).json(books);
};

const getBooks = (req, res) => {
  res.status(200);
  res.json(books);
};

const getBookId = (req, res) => {
  const bookId = parseInt(req.params.id);
  let book = books.find((value) => value.id === bookId);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book Not found!");
  }
};

const putUpdate = (req, res) => {
  let bookId = req.body.id;
  let newBooksArr = books.map((book) => {
    if (book.id === bookId) {
      book.name = req.body.name || book.name;
      book.price = req.body.price;
    }
    return book;
  });
  books = newBooksArr;
  res.status(200).json(books);
};

const patchUpdate = (req, res) => {
  let bookId = req.body.id;
  let newBooksArr = books.map((book) => {
    if (book.id === bookId) {
      book = {
        ...book,
        ...req.body,
      };
    }
    return book;
  });
  books = newBooksArr;
  res.status(200).json(books);
};

const removeBook = (req, res) => {
  let { id } = req.params;
  let newBooksArr = books.filter((book) => book.id !== parseInt(id));
  books = newBooksArr;
  res.status(200).json(books);
};

module.exports = {
  getBooks,
  getBookId,
  createBook,
  putUpdate,
  patchUpdate,
  removeBook,
};
