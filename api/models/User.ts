import mongoose, { model } from "mongoose";
import { Schema } from 'mongoose'

export interface User {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean,
}   


const UserSchema = new mongoose.Schema<User>(
    {
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    isAdmin: {
        type: Boolean,
        default: false,
    },
    }, {timestamps: true})


export default mongoose.model("User", UserSchema);