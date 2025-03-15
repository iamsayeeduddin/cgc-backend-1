const express = require("express");
const booksRoutes = require("./bookRoutes");
const ProductModel = require("../models/productModel");
const router = express.Router();

router.use("/books", booksRoutes);

router.use("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
});

module.exports = router;

/// domain.com/api/v1/books
