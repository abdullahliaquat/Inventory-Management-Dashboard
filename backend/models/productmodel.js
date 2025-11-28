const mongoose = require("mongoose");

const Productmodel = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  currentStock: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
});


const Product = mongoose.model("product", Productmodel);
module.exports = Product;
