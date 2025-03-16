const express = require("express");
const productCtrl = require("../controllers/productCtrl");

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.body.isLoggedIn) {
    console.log("IsLOGGEDIN");
    next();
  } else {
    res.status(401).send("Unauthorized!");
  }
};

const isAdmin = (req, res, next) => {
  if (req.body.role === "ADMIN") {
    console.log("ISADMIN");
    next();
  } else {
    res.status(401).send("Unauthorized!");
  }
};

router.get("/", productCtrl.getProducts);
router.get("/page/:page/pageSize/:pageSize", productCtrl.getProducts);
router.post("/page/:page/pageSize/:pageSize", isLoggedIn, isAdmin, productCtrl.getProducts);
router.post("/addProduct", productCtrl.addProduct);
router.patch("/updateProduct/:id", productCtrl.updateProduct);
router.put("/updateProduct/:id", productCtrl.updateCompProduct);
router.delete("/deleteProduct/:id", productCtrl.deleteProduct);

module.exports = router;
