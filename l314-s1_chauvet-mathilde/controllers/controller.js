const { Users } = require("../models/index.js");

exports.helloworld = (req, res) => {
  res.send("Hello controller");
};
exports.getUsers = async (req, res) => {
  // async toujours avec await
  const users = await Users.findAll();
  // renvoyer les users en json//
  res.json(users);
};
