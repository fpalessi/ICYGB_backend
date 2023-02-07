import express from "express";

import { register, login, profile } from "../controllers/userController.js";

import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", isAuth, profile);

export default router;
