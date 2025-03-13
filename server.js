const express = require("express");

const app = express();

app.listen(5000, () => console.log("Server is Up & Running!"));

app.use("/health", (req, res) => {
  res.status(200);
  res.send("Welcome to my Express Server!");
});

app.use("/books", (req, res) => {
  res.status(200);
  res.send("Welcome to my Express Server!");
});
