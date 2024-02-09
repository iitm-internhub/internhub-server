import express from "express";
import { Login } from "../admin-controller/admin.auth";

const router = express.Router();

router.post("/login", Login);

export default router;
