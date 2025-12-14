const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Page home
router.get("/", controller.helloworld);

// CRUD Users
// Ajout de la fonction de récupération de tous les users
router.get("/users", controller.getUsers);

//Ajourt de la fonction de récupération d'un seul user via son id
router.get("/users/:id", controller.getUserById);

// Ajout de la fonction création d'un user
router.post("/users", controller.createUser);

// Ajout de la fonction suppression d'un user via son id
router.put("/users/:id", controller.updateUser);

module.exports = router;
