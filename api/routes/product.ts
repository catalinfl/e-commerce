import Product from "../models/Product";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken";
import express, { NextFunction, Request, Response } from "express"
import { createError } from "../utils/error";
import { JsonWebTokenError } from "jsonwebtoken";
import { editProduct, getProduct, getProductQuery, getProducts, postProduct } from "../controllers/product";

const router = express.Router();

router.get('/', getProductQuery);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', verifyTokenAndAdmin, editProduct);
router.post('/', verifyTokenAndAdmin, postProduct);

export default router