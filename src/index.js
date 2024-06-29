import express from "express";
import cors from "cors";
import environments from "./config/environments/environments.js";
import { errorLogger, logger } from "./utils/logger/logger.js";
import userRoutes from "./modules/user/routes/userRoute.js";
import authRoutes from './modules/auth/routes/authRoute.js';
import adminRoutes from './modules/admin/routes/adminRoute.js'
import transactionRoutes from './modules/transaction/routes/transactionRoute.js'
import { errorHandler } from "./middleware/errorHandling.js";

import bodyParser from "body-parser";
import { db } from "./config/dbConnection/db.js";
import multer from "multer";

const app = express();
app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/media", express.static("public"));

db.then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});
const upload=multer()
app.use("/api/public", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/account", transactionRoutes);
app.use(errorHandler);
app.use(errorLogger);

app.listen(environments.port, () => {
  console.log(`Server started on port ${environments.port}!`);
}).on("error", (err) => {
  console.log(`Error starting server running: ${err.message}`);
});
