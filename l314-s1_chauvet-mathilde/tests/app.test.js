//Bonne manière pour du texte
const request = require("supertest");
const express = require("../app");

describe("Integration Tests for API Endpoints", () => {
  it("should respond with Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello controller!");
  });
});
