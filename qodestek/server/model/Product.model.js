const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  isWishlisted: [String],
  dom: {
    type: String,
    default: Date.now,
  },

});
module.exports = mongoose.model("products", ProductSchema);
