
import User from "../models/User";
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { verifyTokenAndAuthorization } from "../utils/verifyToken";
import express, { NextFunction, RequestHandler } from "express"
import { register } from "../controllers/auth"
import { Router } from "express"

dotenv.config();

const router = express.Router();

//UPDATE


