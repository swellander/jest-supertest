const app = require("../index.js");
const request = require("supertest");
const agent = request(app);

describe("API Routes", () => {
  describe("GET /api/products", () => {
    test("route exists", () => {
      return agent.get("/api/products").expect(200);
    });
    test("returns an array", () => {
      return agent.get("/api/products").expect(200, []);
    });
  });
});
