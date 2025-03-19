const express = require("express");
const jwt = require("jsonwebtoken");
const productCtrl = require("../controllers/productCtrl");

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.headers.authorization) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(401).send("Invalid Token!");
      } else {
        console.log(decoded);
        req.role = 2;
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized!");
  }
};

const isAdmin = (req, res, next) => {
  if (req.role === 1) {
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
