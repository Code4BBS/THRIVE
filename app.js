const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const middleware = require("./utils/middleware");
// const clientEndpoints = ["discover", "profile", "update"];
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

//routers
const quoraRouter = require("./routes/quoraRoutes");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const searchRouter = require("./routes/searchRoutes.js");
const projectRouter = require("./routes/projectRoutes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(xss());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.set("view engine", "html");
app.use(middleware.requestLogger);

// Serving static files
app.use(express.static(path.join(__dirname, "client/build")));

// API Endpoints
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/quora", quoraRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/project", projectRouter);

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
