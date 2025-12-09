const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("Reservation flow (basic smoke)", () => {
  it("should allow creating reservation endpoint reachable", async () => {
    const res = await request(app)
      .post("/api/reservations")
      .send({
        date: new Date().toISOString(),
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600 * 1000).toISOString(),
        roomId: 1,
      });
    // not authenticated, expect 401
    expect(res.status).toBe(401);
  });
});
