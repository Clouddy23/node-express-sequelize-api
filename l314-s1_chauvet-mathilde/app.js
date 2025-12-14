require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();

// Middleware pour parser le json
app.use(express.json());

const route = require("./routes/route");

app.use("/", route);

//exporter l'app pour l'utiliser dans server.js et les tests
module.exports = app;
