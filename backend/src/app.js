const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

// error handler
app.use(errorHandler);

module.exports = app;
