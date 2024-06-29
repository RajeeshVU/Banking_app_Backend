import express from "express";
import { authGuard } from "../../../shared/guards/authGuard.js";
import { transaction } from "../controller/transactionController.js";



const router = express.Router();

router.post("/transaction/:id", authGuard, transaction);

export default router;
