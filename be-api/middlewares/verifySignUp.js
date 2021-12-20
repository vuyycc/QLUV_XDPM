const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateCredential = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: process.env.MSG_USED_USERNAME_ERR_VI,
        message_dev: "Username is already used!",
      });
      return;
    }

    // mail
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).json({
          message: process.env.MSG_USED_EMAIL_ERR_VI,
          message_dev: "Email is already used!",
        });
        return;
      }
      next();
    });
  });
};

checkRole = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          message: process.env.MSG_ERR_VI,
          message_dev: `Does not exist role: ${req.body.roles[i]}`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateCredential: checkDuplicateCredential,
  checkRole: checkRole,
};

module.exports = verifySignUp;
