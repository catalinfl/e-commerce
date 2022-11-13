import express, { response } from "express"
import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"
import { createError } from "./error";
import dotenv from "dotenv"
import { Extension, FunctionTypeNode, isElementAccessExpression, isThisTypeNode } from "typescript";
import { Path } from "mongoose";
import router from "../routes/auth";
import User from "../models/User";

dotenv.config();

const JWT = process.env.JWT as string;


export interface IGetUserAuthInfoRequest extends Request {
    user: User | string | JwtPayload
}



export type User = {
    isAdmin: boolean,
    id: string
}

export type Token = {
    token: string;
}



export const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.token as string;
    if (authHeader) {
    const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT, (err, user) => {
            req.user = user;
            next();
        })
}
    else {
        return res.status(401).json("You are not authenticated");
        }
}



export const verifyTokenAndAuthorization = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.user['id'] === req.params.id || req.user['isAdmin']) {
            next()
        }
        else return res.status(403).json("You are not aletwlowed to do that");
    })
}


export const verifyTokenAndAdmin = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        console.log(req.user);
        if (req.user['isAdmin']) {
            next();
        }
        else {
            return res.status(403).json("You are not allowed to do that");
        }
    })
}

