const express = require("express");
const bookCtrl = require("../controllers/bookCtrl");
const router = express.Router();

router.get("/", bookCtrl.getBooks);
router.get("/:id", bookCtrl.getBookId);
router.post("/create", bookCtrl.createBook);
router.put("/update", bookCtrl.putUpdate);
router.patch("/update", bookCtrl.patchUpdate);
router.delete("/remove/:id", bookCtrl.removeBook);

module.exports = router;
