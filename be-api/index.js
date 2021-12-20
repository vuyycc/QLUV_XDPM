const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require('dotenv').config();

// express for building API
const app = express();

var corsOption = {
  origin: "*",
};

// middleware list
// enable cors
app.use(cors(corsOption));
// parse request, create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(dotenv.config());

// connect db
const db = require("./models/index.js");
const Role = db.role;
function initial() {
  db.role.create({ id: 1, name: "user" });
  db.role.create({ id: 2, name: "admin" });
}
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Resync DB");
    initial();
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "welcome to chat app" });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
