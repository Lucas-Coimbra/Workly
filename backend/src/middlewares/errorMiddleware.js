const { Prisma } = require("@prisma/client");
const logger = require("../utils/logger");

exports.errorHandler = (err, req, res, next) => {
  // Log completo no servidor (structured)
  try {
    logger.error({
      message: err?.message,
      stack: err?.stack,
      name: err?.name,
      path: req?.originalUrl,
      method: req?.method,
      code: err?.code,
      meta: err?.meta,
    });
  } catch (logErr) {
    console.error("Logger failed:", logErr);
  }

  console.error("🔥 ERROR:", err);

  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Prisma known request errors (e.g. unique constraint, FK not found)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      status = 409;
      const target = Array.isArray(err.meta?.target)
        ? err.meta.target.join(", ")
        : err.meta?.target;
      message = `Unique constraint failed on: ${target || "field"}`;
    } else if (err.code === "P2025") {
      status = 404;
      message = "Record not found.";
    } else {
      status = 400;
      message = err.message || "Database request error";
    }
  }

  // Prisma validation errors (client-side)
  if (err instanceof Prisma.PrismaClientValidationError) {
    status = 400;
    message = "Invalid data sent to the database.";
  }

  // Zod validation errors
  if (err && err.name === "ZodError") {
    status = 400;
    message = err.errors
      .map((e) => {
        const path =
          Array.isArray(e.path) && e.path.length ? e.path.join(".") : "";
        return path ? `${path}: ${e.message}` : e.message;
      })
      .join(" | ");
  }

  if (err.safeMessage) message = err.safeMessage;

  return res.status(status).json({
    error: true,
    message,
    ...(process.env.NODE_ENV !== "production"
      ? {
          details: err?.stack
            ? String(err.stack).split("\n").slice(0, 3)
            : undefined,
        }
      : {}),
  });
};
