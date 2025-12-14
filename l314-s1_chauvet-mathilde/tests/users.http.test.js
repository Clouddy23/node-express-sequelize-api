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
  // -------------------- TEST RÉCUPÉRATION DE TOUS LES USERS --------------------
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

  // -------------------- TEST DE RÉCUPÉRATION D'UN USER VIA SON ID --------------------
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

  // -------------------- TEST DE CRÉATION 1 USER --------------------
  it("POST /users -> Json response - status 201", async () => {
    // Requête POST /users
    const res = await request(app)
      .post("/users")
      .send({ firstname: "Stéphanie", lastname: "Marcellot" })
      .set("Accept", "application/json");

    // Vérifications code HTTP 201, JSON et body avec id, firstname, lastname, createdAt (auto) et updatedAt (auto)
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("firstname", "Jean");
    expect(res.body).toHaveProperty("lastname", "Dupont");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });
});
