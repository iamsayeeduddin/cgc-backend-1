const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    price: { type: Number, required: true },
    discountType: { type: String },
    discount: { type: Number },
    imagePath: { type: String },
    //   createdAt: { type: Date, required: true },
    //   updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
