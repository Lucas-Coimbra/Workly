const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch {
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
