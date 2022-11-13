import express from "express"
import dotenv from "dotenv"
import bcrypt, { compare } from "bcryptjs"
import { visitFunctionBody } from "typescript";
import { User } from "../utils/verifyToken";
import { Request, Response} from "express"

dotenv.config();

export interface Requestsson extends Request {
    password: Passwords
}

type Passwords = {
    password: string;
}

const comparePasswords = async  (req: Request, res: Response) => { 
    if (req.body.password) {
        
    }
}

