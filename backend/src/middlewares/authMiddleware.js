const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token missing" });
  const parts = header.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ message: "Invalid token" });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const requireRole =
  (roles = []) =>
  (req, res, next) => {
    if (!req.userRole)
      return res.status(401).json({ message: "Role not found" });
    if (!roles.includes(req.userRole))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };

module.exports = { verifyToken, requireRole };
