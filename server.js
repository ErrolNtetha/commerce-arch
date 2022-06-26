import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import ip from "ip";
import { errorLog, successLog } from "./src/util/logger.js";
import { mongoose, sequelize } from "./src/api/v1/lib/database.js";
import { authRoutes } from "./src/api/v1/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

mongoose
  .then(() => {
    successLog.info("MongoDB connection has been established successfully.");
  })
  .catch((err) => {
    errorLog.error(`Unable to connect to MongoDB database: ${err}`);
  });

sequelize
  .authenticate()
  .then(() => {
    successLog.info("MariaDB connection has been established successfully.");
  })
  .catch((err) => {
    errorLog.error(`Unable to connect to MariaDB database: ${err}`);
  });

// auth routes
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  successLog.info(`Server Started At: ${ip.address()}:${PORT}`);
});
