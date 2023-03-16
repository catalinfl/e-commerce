import express, {Request, Response, NextFunction} from "express"
import dotenv from "dotenv"
import { createError } from "../utils/error";
import Product from "../models/Product";

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = newProduct.save();
        res.status(200).send(savedProduct);
    }
    catch(err) {
        next(createError(501, err));
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const myProduct = await Product.findById({ _id: req.params.id })
        res.status(200).json(myProduct);
    }
    catch(err) {
        res.status(404).json(err);
    }
}

export const getProductQuery = async (req: Request, res: Response) => {
    try {
        const queryProduct = await Product.find({ price: req.query.price })
        res.status(200).json(queryProduct)
    }
    catch(err) {
        res.status(404).json(err);
    }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getProducts = await Product.find();
        res.status(202).json(getProducts);
    }
    catch(err) {
        res.status(403).json(err);
    }

}

export const editProduct = async (req: Request, res: Response) => {
        try {
            const oldPriceKnew = await Product.findById({_id: req.params.id});
            
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {   oldPrice: oldPriceKnew.price,
                    $set: req.body
                },
                { new: true } )
                res.status(200).json(updatedProduct);       
            }
            catch(err) {
            res.status(404).json(err);
        }
    }