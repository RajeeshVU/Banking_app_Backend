import express from "express";

import { authGuard } from "../../../shared/guards/authGuard.js";
import { uploadImage } from "../../../utils/multer/uploadImage.js";
import { createAccount, updateAccount, updateUser } from "../controllers/adminController.js";
import { roleGuard } from "../../../shared/guards/roleGuard.js";
import { register } from "../../auth/controller/authController.js";




const router = express.Router();
router.post("/create_admin",authGuard,roleGuard,uploadImage(),register);
router.post("/update_user/:id",authGuard,roleGuard,uploadImage(),updateUser);
router.post("/create_account",authGuard,roleGuard,uploadImage(),createAccount);
router.put("/update_account/:id",authGuard,roleGuard,uploadImage(),updateAccount);

export default router;
