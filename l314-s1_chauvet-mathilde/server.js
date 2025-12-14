require("dotenv").config({ quiet: true });
const app = require("./app");

const port = process.env.PORT;

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
