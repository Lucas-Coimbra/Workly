jest.mock("../../src/config/prisma");

const prisma = require("../../src/config/prisma");
const authService = require("../../src/services/authService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register - creates a new user", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: 1, email: "a@a.com" });
    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed");

    const result = await authService.register({
      name: "A",
      email: "a@a.com",
      password: "123",
    });

    expect(prisma.user.findUnique).toHaveBeenCalled();
    expect(prisma.user.create).toHaveBeenCalled();
    expect(result.email).toBe("a@a.com");
  });

  test("login - returns token and user", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "a@a.com",
      password: "hashed",
      role: "USER",
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    jest.spyOn(jwt, "sign").mockReturnValue("token123");

    const result = await authService.login({
      email: "a@a.com",
      password: "123",
    });

    expect(result.token).toBe("token123");
  });
});
