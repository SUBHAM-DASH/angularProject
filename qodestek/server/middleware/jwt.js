const jwt = require("jsonwebtoken");
const User = require("../model/User.model");
const jwtSecret = "qudestek";

//------------------------------ Auth ------------------------------//

exports.auth = (req, res, next) => {
  let token;
  const bearerHeader = req.header("Authorization");

  if (!bearerHeader) {
    return res.status(401).json({ message: "No token, authorization denied!" });
  }

  let parts = bearerHeader.split(" ");
  if (parts.length === 2) {
    let scheme = parts[0];
    let credentials = parts[1];
    token = credentials;
  } else {
    return res.status(401).json({ message: "token format is not valid!" });
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied!" });
  } else {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      if (decoded._id === "explore") {
        next();
      } else {
        if (decoded) {
          User.findOne({ _id: decoded._id }).then((user) => {
            if (user) {
              if (user.token.toString() == token.toString()) {
                next();
              } else {
                return res.status(400).json({ message: "token is not valid" });
              }
            } else {
              return res.status(400).json({ message: "token is not valid" });
            }
          });
        }
      }
    } catch (e) {
      return res.status(400).json({ message: "token is not valid" });
    }
  }
};
