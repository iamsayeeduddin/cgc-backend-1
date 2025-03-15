// console.log("Welcome to backend!");
const http = require("http");

let controller = (req, res) => {
  console.log(req);
};

let books = [
  {
    id: 1,
    name: "HTML & CSS",
    price: "400",
  },
  {
    id: 2,
    name: "JavaScript",
    price: "800",
  },
];

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url.includes("welcome")) {
    res.statusCode = 200;
    res.write("Welcome to my Server!");
  } else if (req.url.includes("books")) {
    let reqArr = req.url.split("/");
    let resp = null;

    if (Number.isNaN(parseInt(reqArr[2]))) {
      res.statusCode = 200;
      resp = JSON.stringify(books);
    } else {
      let book = books.find((value) => value.id === parseInt(reqArr[2]));
      if (book) {
        res.statusCode = 200;
        resp = JSON.stringify(book);
      } else {
        res.statusCode = 404;
        resp = "Book Not Found";
      }
    }
    res.write(resp);
  } else {
    res.statusCode = 404;
    res.write("Request not found!");
  }
  res.end();
});
server.listen(5000, () => console.log("Server is Up!"));

// REST API

app.use("/health", (req, res) => {
  res.status(200);
  res.send("Welcome to my Express Server!");
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  let book = books.find((value) => value.id === bookId);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book Not found!");
  }
});

app.get("/books", (req, res) => {
  res.status(200);
  res.json(books);
});

app.post("/books/create", (req, res) => {
  let newID = books[books.length - 1].id + 1;
  //   let newID = books.length + 1;
  let newBook = {
    id: newID,
    ...req.body,
  };

  books.push(newBook);

  res.status(201).json(books);
});

app.put("/books/update", (req, res) => {
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
});

app.patch("/books/update", (req, res) => {
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
});

app.delete("/books/remove/:id", (req, res) => {
  let { id } = req.params;
  let newBooksArr = books.filter((book) => book.id !== parseInt(id));
  books = newBooksArr;
  res.status(200).json(books);
});
