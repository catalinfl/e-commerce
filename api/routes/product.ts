import Product from "../models/Product";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken";
import express, { NextFunction, Request, Response } from "express"
import { createError } from "../utils/error";
import { JsonWebTokenError } from "jsonwebtoken";
import { editProduct, getProduct, getProducts, postProduct } from "../controllers/product";

const router = express.Router();

router.get('/', verifyToken, getProducts);
router.get('/:id', verifyToken, getProduct);
router.post('/', verifyTokenAndAdmin, postProduct);
router.put('/:id', verifyTokenAndAdmin, editProduct);


export default router