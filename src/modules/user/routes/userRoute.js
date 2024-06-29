import express from "express";

import { authGuard } from "../../../shared/guards/authGuard.js";
import { updateUser } from "../controller/userController.js";
import { uploadImage } from "../../../utils/multer/uploadImage.js";

const router = express.Router();

router.put("/update/:id", authGuard, uploadImage(), updateUser);

export default router;
