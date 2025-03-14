const express = require("express");

const app = express();

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

app.listen(5000, () => console.log("Server is Up & Running!"));

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
  console.log(req.body);
});
