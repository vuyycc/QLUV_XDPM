const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: process.env.MSG_ERR_VI,
      message_dev_token: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: process.env.MSG_ERR_VI,
        message_dev: "Unauthorized",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: process.env.MSG_AUTHORIZE_ERR_VI,
          message_dev: "Require admin role!",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: process.env.MSG_ERR_VI,
      });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

module.exports = authJwt;
