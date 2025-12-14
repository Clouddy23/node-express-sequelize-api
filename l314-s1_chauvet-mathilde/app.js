require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();

const route = require("./routes/route");

app.use("/", route);

//exporter l'app pour l'utiliser dans server.js et les tests
module.exports = app;
