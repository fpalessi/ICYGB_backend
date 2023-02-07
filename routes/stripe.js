import express from "express";

import { checkOut } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payment", checkOut);

export default router;
