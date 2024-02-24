const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  try {
    // Verificar duplicados por nombre de usuario
    const usernameUser = await User.findOne({ username: req.body.username }).exec();
    if (usernameUser) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Verificar duplicados por correo electrónico
    const emailUser = await User.findOne({ email: req.body.email }).exec();
    if (emailUser) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    // Si no hay duplicados, continúa con la siguiente middleware
    next();
  } catch (error) {
    console.error("Error checking duplicate username and email:", error);
    return res.status(500).send({ message: error });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;