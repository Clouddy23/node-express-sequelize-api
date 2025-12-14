const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Page home
router.get("/", controller.helloworld);

// CRUD Users
// Ajout de la fonction de récupération de tous les users
router.get("/users", controller.getUsers);

module.exports = router;
