import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/", userController.read);
router.post("/register", userController.create);
router.post("/login", userController.authenticate);

export default router;
