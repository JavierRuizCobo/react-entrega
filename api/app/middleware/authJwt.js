const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId).exec();
  
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      const roles = await Role.find({ _id: { $in: user.roles } }).exec();
  
      const isAdminRole = roles.some(role => role.name === "admin");
  
      if (isAdminRole) {
        next();
      } else {
        res.status(403).send({ message: "Require Admin Role!" });
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      res.status(500).send({ message: "Failed to check admin role." });
    }
  };
  

  const isModerator = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId).exec();
  
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      const roles = await Role.find({ _id: { $in: user.roles } }).exec();
  
      const isModeratorRole = roles.some(role => role.name === "moderator");
  
      if (isModeratorRole) {
        next();
      } else {
        res.status(403).send({ message: "Require Moderator Role!" });
      }
    } catch (error) {
      console.error("Error checking moderator role:", error);
      res.status(500).send({ message: "Failed to check moderator role." });
    }
  };

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;