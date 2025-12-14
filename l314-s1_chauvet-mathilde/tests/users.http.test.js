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

//-------------------- TESTS --------------------
// Describe pour grouper les tests CRUD Users, comprends plusieurs it (cf cours)
describe("CRUD Users (Supertest + MySQL)", () => {
  // -------------------- RÉCUPÉRER TOUS LES USERS --------------------
  it("GET /users -> Json response - status 200", async () => {
    // Requête GET /users
    const res = await request(app)
      .get("/users")
      // Pour dire qu'on veut du JSON en réponse
      .set("Accept", "application/json");

    // Vérifications code HTTP 200, JSON et body tableau d'users
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // -------------------- RÉCUPÉRER 1 USER VIA SON ID --------------------
  it("GET /users/:id -> Json response - status 200", async () => {
    // Création d'un user pour être sûr d'avoir un id
    const created = await models.Users.create({
      firstname: "Test",
      lastname: "User",
    });

    // Requête GET /users/:id
    const res = await request(app)
      .get(`/users/${created.id}`)
      .set("Accept", "application/json");

    // Vérifications
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id", created.id);
  });
});
