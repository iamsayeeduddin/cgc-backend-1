const express = require("express");
const booksRoutes = require("./bookRoutes");
const productRoutes = require("./productRoutes");
const router = express.Router();

router.use("/books", booksRoutes);

router.use("/products", productRoutes);

module.exports = router;

/// domain.com/api/v1/books
