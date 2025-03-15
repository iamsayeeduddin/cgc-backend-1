const express = require("express");
const productCtrl = require("../controllers/productCtrl");

const router = express.Router();

router.get("/", productCtrl.getProducts);
router.post("/addProduct", productCtrl.addProduct);
router.patch("/updateProduct/:id", productCtrl.updateProduct);
router.put("/updateProduct/:id", productCtrl.updateCompProduct);
router.delete("/deleteProduct/:id", productCtrl.deleteProduct);

module.exports = router;
