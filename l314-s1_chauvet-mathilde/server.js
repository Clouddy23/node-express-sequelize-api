require("dotenv").config({ quiet: true });
const app = require("./app");

// Importation des modèles pour connexion à la BDD
const db = require("./models");

const port = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
