const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(5000, () => console.log("Server is Up & Running!"));

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("I am in middleware!");
//   next();
// });

app.use("/api/v1/", require("./routes/routes"));

mongoose
  .connect("mongodb://127.0.0.1:27017/cgc")
  .then(() => console.log("DB Connected to Server!"))
  .catch((err) => console.log(err));
