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
