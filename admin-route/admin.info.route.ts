import express from "express";
import { getAllUsers } from "../admin-controller/admin.info";
import protect_admin from "../middleware/verifyToken";

const router = express.Router();

router.post("/all-users", protect_admin, getAllUsers);

export default router;
