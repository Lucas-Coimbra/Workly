const router = require("express").Router();
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const prisma = require("../config/prisma");

// Example admin endpoints
router.get(
  "/users",
  verifyToken,
  requireRole(["ADMIN"]),
  async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/users/:id/role",
  verifyToken,
  requireRole(["ADMIN"]),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { role } = req.body;
      const updated = await prisma.user.update({
        where: { id },
        data: { role },
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
