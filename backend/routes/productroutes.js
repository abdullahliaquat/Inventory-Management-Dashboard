const express = require("express");
const {
  addProduct,
  getallProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  updateProductStock,
} = require("../controllers/productcontroller");

const router = express.Router();

router.get("/", getallProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/stock", updateProductStock);

module.exports = router;
