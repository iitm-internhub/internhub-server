import { Router } from "express";
import { Login, Signup } from "../controller/authentication.controller.js";

const router: Router = Router();

router.post("/signup", Signup);
router.post("/login", Login);

export default router;
