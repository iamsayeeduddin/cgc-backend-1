const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

app.listen(5001, () => console.log("Server is Up & Running!"));

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("I am in middleware!");
//   next();
// });

const dir = path.join(__dirname, "logs");
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const filePath = path.join(__dirname, "logs", "request.log");
const stream = fs.createWriteStream(filePath, { flags: "a" });

app.use(morgan("combined", { stream }));

app.use("/api/v1/", require("./routes/routes"));

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected to Server!"))
  .catch((err) => console.log(err));
