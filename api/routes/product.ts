import Product from "../models/Product";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken";
import express, { NextFunction, Request, Response } from "express"
import { createError } from "../utils/error";
import { JsonWebTokenError } from "jsonwebtoken";
import { editProduct, getProduct, getProductQuery, getProducts, postProduct } from "../controllers/product";

const router = express.Router();

router.get('/', getProducts);
router.get('/search', getProductQuery);
router.get('/:id', getProduct);
router.put('/:id', editProduct);
router.post('/', postProduct);

export default router