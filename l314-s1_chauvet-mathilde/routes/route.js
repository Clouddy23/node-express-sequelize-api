const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

//------------------------------ CRUD Users ------------------------------

// Page home
router.get("/", controller.helloworld);

// Ajout de la fonction de récupération de tous les users
router.get("/users", controller.getUsers);

//Ajourt de la fonction de récupération d'un seul user via son id
router.get("/users/:id", controller.getUserById);

// Ajout de la fonction création d'un user
router.post("/users", controller.createUser);

// Ajout de la fonction suppression d'un user via son id
router.put("/users/:id", controller.updateUser);

// Ajout de la fonction modification d'un user via son id
router.delete("/users/:id", controller.deleteUser);

module.exports = router;
