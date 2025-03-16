const ProductModel = require("../models/productModel");
const { responseObjGenerator } = require("../utils/utils");

// PAGINATION
// page => The Page being visited
// pageSize => No of Records to be shown in one page
// Skip => (page - 1) * pageSize

const getProducts = async (req, res) => {
  const { page, pageSize } = req.params;
  const skip = (page - 1) * pageSize;
  const data = req.body;
  let filter = {};
  if (data) {
    if (data.isSearch) {
      filter = {
        $or: [{ name: { $regex: data.search, $options: "i" } }, { category: { $regex: data.search, $options: "i" } }],
      };
    } else {
      filter = {
        ...data,
      };
    }
  }

  const { sort, dir } = req.query;
  console.log(req.query);

  const products = await ProductModel.find(filter)
    .sort({
      [sort]: dir,
    })
    .skip(skip)
    .limit(pageSize);
  const count = await ProductModel.countDocuments();
  res.status(200).json(products);
};

// const searchProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     const products = await ProductModel.find();
//   } catch (e) {
//     console.log(e);
//     let resObj = responseObjGenerator(false);
//     res.status(500).json(resObj);
//   }
// };

const addProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = new ProductModel(data);
    await product.save();
    let resObj = responseObjGenerator(true, "Product Added Successfully!", product);
    res.status(201).json(resObj);
  } catch (e) {
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const product = await ProductModel.findOneAndUpdate({ _id: productId }, data, { new: true });
    // const prd = await ProductModel.findOne({ _id: productId });
    let resObj = responseObjGenerator(true, "Product Updated Successfully!", product);
    res.status(200).json(resObj);
  } catch (e) {
    console.log(e);
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
  }
};

const updateCompProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const product = await ProductModel.updateOne(
      { _id: productId },
      {
        $set: {
          name: data.name,
          price: data.price,
          category: data.category,
          inStock: data.inStock,
          discountType: data.discountType,
          discount: data.discount,
        },
      },
      { new: true }
    );
    let resObj = responseObjGenerator(true, "Product Updated Successfully!", product);
    res.status(200).json(resObj);
  } catch (e) {
    console.log(e);
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
  }
};

const deleteProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    await ProductModel.deleteOne({ _id: productId });
    let resObj = responseObjGenerator(true, "Product Deleted Successfully!");
    res.status(200).json(resObj);
  } catch (e) {
    console.log(e);
    let resObj = responseObjGenerator(false);
    res.status(500).json(resObj);
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateCompProduct,
};
