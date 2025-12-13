const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// define the home page route
router.get("/", controller.helloworld);

// Ajout fonction pour récupérer users
router.get("/users", controller.getUsers);

module.exports = router;
