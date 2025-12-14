const { Users } = require("../models/index.js");

exports.helloworld = (req, res) => {
  res.send("Hello controller!");
};

//------------------- Ajout de la fonction récupération de tous les users -------------------
// Export fonction pour utilisation dans route.js - Async toujours avec await
exports.getUsers = async (req, res) => {
  // try/catch pour gérer les erreurs
  try {
    // Demande à sequelize de récupérer tous les users et stockage dans variable users
    const users = await Users.findAll();
    // Renvoi code HTTP succès en JSON, avec ajout de return sinon fonction continue
    return res.status(200).json(users);
  } catch (error) {
    // Log erreur serveur
    console.error("Erreur de récupération des users :", error);
    // renvoi erreur en JSON
    return res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des users.",
    });
  }
};

//------------------- Ajout de la fonction récupération d'un seul user via son id -------------------
exports.getUserById = async (req, res) => {
  try {
    // Récupération de l'id dans paramètres de la requête
    const id = req.params.id;
    // Si id absent
    if (!id) {
      // Renvoi erreur 400 bad request
      return res.status(400).json({ error: "ID absent." });
    }

    // Recherche user par id (PK Primary Key)
    const user = await Users.findByPk(id);
    // Si id absent
    if (!user) {
      // Renvoi erreur 404 not found
      return res.status(404).json({ error: "User non trouvé." });
    }

    // Si tout est ok, renvoi user en JSON avec code 200 succès
    return res.status(200).json(user);
  } catch (error) {
    // Log erreur serveur
    console.error("Erreur de récupération du user via son ID:", error);
    // renvoi erreur en JSON
    return res.status(500).json({
      error: "Une erreur est survenue lors de la récupération du user.",
    });
  }
};

//------------------- Ajout de la fonction création d'un user -------------------
exports.createUser = async (req, res) => {
  try {
    // Récupération données du user du body de la requête
    const { firstname, lastname } = req.body;

    // Vérification champs obligatoires
    if (!firstname || !lastname) {
      return res.status(400).json({
        error: "Le prénom et nom sont obligatoires.",
      });
    }

    // Création nouvel user par sequelize
    const newUser = await Users.create({ firstname, lastname });

    // Renvoi code 201 Created
    return res.status(201).json(newUser);
  } catch (error) {
    // Log erreur serveur
    console.error("Erreur lors de la création de l'user :", error);
    // renvoi erreur en JSON
    return res.status(500).json({
      error: "Une erreur est survenue lors de la création de l'user.",
    });
  }
};
