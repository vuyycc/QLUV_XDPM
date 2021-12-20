const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.user;
const Role = db.role;

const op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  // save user to db
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: process.env.MSG_LOGIN_SUCCESS_VI });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: process.env.MSG_LOGIN_SUCCESS_VI });
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: process.env.MSG_ERR_VI, message_dev: err.message });
    });
};

exports.logIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: process.env.MSG_ERR_USER_NOT_FOUND_VI,
        });
      }

      var passIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: process.env.MSG_ERR_PASSWORD_VI,
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 /* ~24 hours*/,
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          user: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: process.env.MSG_ERR_VI, message_dev: err.message });
    });
};
