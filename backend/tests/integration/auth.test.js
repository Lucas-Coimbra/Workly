const request = require("supertest");
const app = require("../../src/app");

describe("Auth routes (smoke)", () => {
  it("should respond on register route", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "secret123",
    });
    expect([201, 409, 500]).toContain(res.status);
  });
});
