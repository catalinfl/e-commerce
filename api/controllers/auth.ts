import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"
import { createError } from "../utils/error";
import dotenv from "dotenv";

dotenv.config();

const JWT = process.env.JWT

if (typeof(JWT) !== "string") {
    throw Error;
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    })
  try {  
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};



export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      JWT,
      {expiresIn: '3d'}
    );
  
    const { password, ...others} = user.toJSON();
    res.status(200).json({ ...others, accessToken}); 
  } catch (err) { 
    res.status(500).json(err);
  }
};