
import User from "../models/User";
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../utils/verifyToken";
import express, { NextFunction, RequestHandler } from "express"
import { register } from "../controllers/auth"
import { Router } from "express"
import { editUser, getUser, getUsers } from "../controllers/user";

dotenv.config();

const router = express.Router();

router.get('/', verifyTokenAndAdmin, getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyTokenAndAdmin, editUser);
//UPDATE

export default router;
