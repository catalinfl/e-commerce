import express, { Request, Response, NextFunction} from "express"
import { createError } from "../utils/error";
import Order from "../models/Order";

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch(err) {
        next(createError(501, err));
    }
}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getOrder = await Order.findById({ _id: req.params.id });
        res.status(200).json(getOrder);
    }
    catch(err) {
        res.status(404).json(err);
    }
}


export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getOrders = await Order.find();
        res.status(200).json(getOrders);
    }
    catch(err) {
        res.status(404).json(err);
    }
}

export const editOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true} )
        res.status(200).json(updatedOrder);
    }
    catch(err) {
        res.status(404).json(err);
    }
}

