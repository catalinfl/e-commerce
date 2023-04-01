import express, {Request, Response, NextFunction, query} from "express"
import dotenv from "dotenv"
import { createError } from "../utils/error";
import Product from "../models/Product";
import Brand from "../models/Brand";


type QueryType = {
    minPrice?: string,
    maxPrice?: string,
    disponibility?: string,
    top?: string
}


export const postProduct = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const { brand } = req.body
        
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();

        const newBrand = new Brand({
            mainObject: savedProduct._id,
            brand
        })
        const savedBrand = await newBrand.save();
        
        res.status(200).send(savedBrand);
    }
    catch(err) {
        next(createError(501, err));
    }
}

export const getProductsParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = req.params.categories;
        const products = await Product.find({
            categories: categories
        })
        res.json(products).status(200)
    }
    catch(err) {
        res.json(err).status(404)
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
        if (req.params.categories) {
        const minPrice = req.query.minPrice as string;
        const maxPrice = req.query.maxPrice as string;
        const disponibility = req.query.disponibility as string;
        const top = req.query.top as string;

        // search query 
        let query: QueryType = {};
        if (minPrice) {
            query.minPrice = minPrice;
        }
        if (maxPrice) {
            query.maxPrice = maxPrice;
        }
        if (disponibility) {
            query.disponibility = disponibility
        }
        if (top) {
            query.top = top;
        }

        const queriedProducts = await Product.find({
            categories: req.params.categories
        });

        const getQueriedProducts: any = []

        if (query.minPrice && query.maxPrice) {
            queriedProducts.map((product) => {
                if (Number(product.price) >= Number(query.minPrice) && Number(product.price) <= Number(query.maxPrice)) {
                    getQueriedProducts.push(product)
                    }
                })
            }
        res.status(200).json(getQueriedProducts)
        }
    }
        catch(err) {
            res.status(404).json(err);
        }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        let categories: string[] = [];
        products.map((product) => {
            if (!categories.includes(product.categories)) {
                categories.push(product.categories);
            }
        })
        res.status(200).json(categories);
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