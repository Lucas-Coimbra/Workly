const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const prisma = require("../config/prisma");

router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const u = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, role: true },
    });
    res.json(u);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
