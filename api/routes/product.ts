import Product from "../models/Product";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken";
import express, { NextFunction, Request, Response } from "express"
import { createError } from "../utils/error";
import { JsonWebTokenError } from "jsonwebtoken";
import { editProduct, getProduct, getProducts, postProduct } from "../controllers/product";

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', verifyTokenAndAdmin, postProduct);
router.put('/:id', verifyTokenAndAdmin, editProduct);


export default router