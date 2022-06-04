const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static userRegistration = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.json({ status: "failed", message: "email already exits" });
    } else {
      if (email && password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const newUser = new UserModel({
            email: email,
            password: hashPassword,
          });
          await newUser.save();

          const saved_user = await UserModel.findOne({ email: email });
          //GENERATE JWT TOKEN
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.json({ status: "success", token: token });
        } catch (error) {
          res.json({ status: "failed", message: "unable to register" });
        }
      } else {
        res.json({ status: "failed", message: "all fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user == null) {
          res.json({
            status: "failed",
            message: "all fields are required",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (email === user.email && isMatch) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.json({
            status: "success",
            message: "login successfully",
            token: token,
          });
        } else {
          return res.json({
            status: "failed",
            message: "Email or Password are not valid",
          });
        }
      } else {
        res.json({ status: "failed", message: "all fields are required" });
      }
    } catch (error) {}
  };

  static changePassword = async (req, res) => {
    const { password } = req.body;
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.compare(password,salt);
        await UserModel.findByIdAndUpdate(req.user._id,{$set:{password:newHashPassword}});
        res.json({"status":"success","message":"password changed successfully"});
      } catch (error) {
        return res.json({"status":"failed","message":"please give correct credentials"});
      }
    } else {
      return res.json({"status":"failed","message":"all fields are required"});
    }
  };
  //1.36
}
module.exports = UserController;
