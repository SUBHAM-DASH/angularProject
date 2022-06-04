const express = require('express');
const router = express.Router();
const UserController=require('../controller/auth.controller');
const checkUserAuth=require('../middleware/jwt');


//public routes
router.post('/register',UserController.userRegistration);
router.post('/loginuser',UserController.userLogin);

//protected route
router.post('/changepassword',checkUserAuth,UserController.changePassword);


module.exports = router;
