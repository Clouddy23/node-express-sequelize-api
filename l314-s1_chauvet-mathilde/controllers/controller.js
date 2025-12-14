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
    return res
      .status(500)
      .json({
        error: "Une erreur est survenue lors de la récupération des users.",
      });
  }
};
