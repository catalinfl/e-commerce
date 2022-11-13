import { verify } from "crypto";
import express, { Request, Response} from "express"
import { register, login } from "../controllers/auth"
import { verifyToken } from "../utils/verifyToken"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router