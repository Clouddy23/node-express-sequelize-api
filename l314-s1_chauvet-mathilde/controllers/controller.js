const { Users } = require("../models/index.js");
exports.helloworld = (req, res) => {
  res.send("Hello controller");
};
exports.getUsers = (req, res) => {
  res.send("Hello Mathilde");
};
