const express = require('express');
const router = express.Router();
const ProductDetails=require('../controller/product.controller');
const checkUserAuth=require('../middleware/jwt');



/////////////////////////-----GET ALL PRODUCTS -----/////////////////////////
router.get('/getallproduct',checkUserAuth,ProductDetails.getallproduct);

/////////////////////////-----ADD PRODUCTS-----/////////////////////////////
router.post('/addproduct',checkUserAuth,ProductDetails.addproduct);

/////////////////////////-----ADD TO WISHLIST------////////////////////////////
router.put('/addtowishlist',checkUserAuth,ProductDetails.addtowishlist);

/////////////////////////-----ALL WISHLISTED PRODUCT-----//////////////////////
router.get('/allwishlistproducts',checkUserAuth,ProductDetails.allwishlistproducts);

/////////////////////////------PAGINATION WITH ALL PRODUCTS------//////////////////////
router.get('/startpagination',checkUserAuth,ProductDetails.startpagination);

/////////////////////////----- REMOVE WISHLIST PRODUCT-----//////////////////////
router.post('/removewishlistproduct',checkUserAuth,ProductDetails.removewishlistproduct);


module.exports = router;
