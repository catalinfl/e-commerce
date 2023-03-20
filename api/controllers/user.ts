import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import User from "../models/User"

dotenv.config();

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getUser = await User.findById({ _id: req.params.id });
        res.status(200).json(getUser);
    }
    catch(err) {
        res.status(400).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        
    }
    catch(err) {

    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    }
    catch(err) {
        res.status(404).json(err);
    }
}

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const editPost = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, upsert: true });
        res.status(201).json(editPost);
    }
    catch(err) {
        res.status(404).json(err);
    }
}