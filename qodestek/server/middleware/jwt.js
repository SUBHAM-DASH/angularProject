const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");

var checkUserAuth = async (req, res,next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //Get token from Header
      token = authorization.split(" ")[1];

      //Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //Getuser form Token
      req.user=await UserModel.findById(userID).select('-password');
      next();
    } catch (error) {
      return res.json({"status":"failed","message":"UnAuthorized error"});
    }
  }
  if(!token){
    res.json({"status":"failed","message":"UnAuthorized Error, No token"})
  }
};
module.exports = checkUserAuth;
