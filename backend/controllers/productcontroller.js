const Product = require("../models/productmodel");

const addProduct = async (req, res) => {
  try {
    const { sku, name, currentStock, description } = req.body;
    const productexists = await Product.findOne({ sku });
    if (productexists) {
      return res.status(400).json({ message: "Product already exists!" });
    }
    const product = new Product({
      sku: req.body.sku,
      name: req.body.name,
      currentStock: req.body.currentStock,
      description: req.body.description,
    });
    const result = await product.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Add product error", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const getallProducts = async (req, res) => {
  try {
    const showAll = await Product.find();
    res.status(200).json(showAll);
  } catch (error) {
    res.status(400).json({ message: "Error fetching data." });
  }
};

const getProduct = async (req, res) => {
  try {
    const oneproduct = await Product.findById(req.params.id);

    if (!oneproduct) {
      return res.status(400).json({ message: "Product not found." });
    }
    res.status(200).json(oneproduct);
  } catch (error) {
    res.status(400).json({ message: "Server error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const delproduct = await Product.findByIdAndDelete(req.params.id);
    if (delproduct) {
      res.json({ message: "Product Deleted." });
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateProduct = async (req, res) => {
  const { sku, name, currentStock, description } = req.body;
  try {
    const updateproduct = await Product.findByIdAndUpdate(req.params.id);
    if (updateproduct) {
      updateproduct.sku = sku;
      updateproduct.name = name;
      updateproduct.currentStock = currentStock;
      updateproduct.description = description;
      const updatedproduct = await updateproduct.save();
      res.json(updatedproduct);
    } else {
      return res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateProductStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.currentStock = req.body.currentStock;
    const updated = await product.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error });
  }
};


module.exports = {
  addProduct,
  getallProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  updateProductStock,
};
