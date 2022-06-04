const Products = require("../model/Product.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { async } = require("rxjs");

class ProductDetails {
  //ROUTE:1 FOR GET ALL PRODUCT
  static getallproduct = async (req, res) => {
    try {
      const allProduct = await Products.find();
      res.json({ status: "success", result: allProduct });
    } catch (error) {
      return res.status(500).json({ error: "internal server error" });
    }
  };

  //ROUTE:2 FOR ADDING PRODUCT
  static addproduct = async (req, res) => {
    const { productname, price, rating, dom } = req.body;
    try {
      const PRODUCT = new Products({
        userId: req.user._id.toString(),
        product_name: productname,
        price: price,
        rating: rating,
        dom: dom,
      });
      await PRODUCT.save();
      res.json({ status: "success", message: "Added Successfully" });
    } catch (error) {
      return res.status(500).json({ error: "internal server error",error:error.message });
    }
  };

  //ROUTE :3 FOR ADD TO WISHLIST
  static addtowishlist = async (req, res) => {
    const { id } = req.body;
    const user = req.user._id.toString();
    try {
      const WISHLIST = await Products.findOne({ _id: id, isWishlisted: user });
      if (WISHLIST) {
        return res.json({ message: "Already Added in Wishlist" });
      }
      await Products.updateOne({ _id: id }, { $push: { isWishlisted: user } });
      res.json({ status: "success", message: "Added In Wishlist" });
    } catch (error) {
      return res.status(500).json({ error: "internal server error" });
    }
  };

  //ROUTE :4 FOR ALL THE WISHLISTED PRODUCTS
  static allwishlistproducts = async (req, res) => {
    try {
      const user = req.user._id.toString();
      const allwishlistproduct = await Products.find({
        isWishlisted: user,
      });
      res.json({ result: allwishlistproduct });
    } catch (error) {
      return res.status(500).json({ error: "internal server error" });
    }
  };

  //ROUTE: 5 FOR ALL PRODUCT PAGINATION
  static startpagination = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    try {
      const fetchAllproducts = await Products.find();
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let finalResult = {};
      if (startIndex > 0) {
        finalResult.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      if (endIndex < fetchAllproducts.length) {
        finalResult.next = {
          page: page + 1,
          limit: limit,
        };
      }

      finalResult.result = fetchAllproducts.slice(startIndex, endIndex);
      res.json({ results: finalResult });
    } catch (error) {
      return res.status(500).json({ error: "internal server error" });
    }
  };

  //ROUTE:5 REMOVE THE PRODUCT FORM WISHLIST
  static removewishlistproduct = async (req, res) => {
    try {
      const user = req.user._id.toString();
      const { id } = req.body;
      console.log(user);
      await Products.updateOne({_id:id}, {$pull:{isWishlisted:{$in:[user]}}});
      res.json({ message: "removed from wishlist" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "internal server error", error: error.message });
    }
  };
}

module.exports = ProductDetails;
