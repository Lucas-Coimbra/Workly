const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.Routes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notification.Routes");
const dashboardRoutes = require("./routes/dashboard.Routes");
const planRoutes = require("./routes/plan.Routes");
const meRoutes = require("./routes/me.Routes");
const supportRoutes = require("./routes/support.routes");
const spaceRequestRoutes = require("./routes/spaceRequest.routes");

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
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/me", meRoutes);
app.use("/api/support", supportRoutes);
app.use("/api", spaceRequestRoutes);

// error handler
app.use(errorHandler);

module.exports = app;
