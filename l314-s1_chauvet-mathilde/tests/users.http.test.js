// Importations
const request = require("supertest");
const app = require("../app");
const models = require("../models");

// Avant tests connexion recréer table Users pour stabilité des tests
beforeAll(async () => {
  await models.sequelize.authenticate();
  // pour supprimer et recrée tables (juste parce que BDD test)
  await models.sequelize.sync({ force: true });
});

// Après tests fermer Sequelize (sinon Jest va rester ouvert)
afterAll(async () => {
  await models.sequelize.close();
});
