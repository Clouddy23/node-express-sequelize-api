"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users", // ⚠️ souvent "Users" (majuscule) car ta migration a créé la table "Users"
      [
        {
          firstname: "Mathilde",
          lastname: "Chauvet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

