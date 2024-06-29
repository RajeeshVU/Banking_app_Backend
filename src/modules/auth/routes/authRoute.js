import express from "express";
import { accessToken, login, register } from "../controller/authController.js";
import { uploadImage } from "../../../utils/multer/uploadImage.js";

const router = express.Router();

router.post("/access_token", accessToken);
router.post("/register", uploadImage(), register);
router.post("/login", login);

export default router