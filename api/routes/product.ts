import Product from "../models/Product";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken";
import express, { NextFunction, Request, Response } from "express"
import { createError } from "../utils/error";
import { JsonWebTokenError } from "jsonwebtoken";
import { editProduct, getCategories, getProduct, getProductQuery, getProducts, getProductsParams, postProduct } from "../controllers/product";

const router = express.Router();

router.get('/', getProducts);
router.get('/categoriesAll', getCategories);
router.get('/search/:categories', getProductsParams);
router.get('/search/:categories/query', getProductQuery);
router.get('/:id', getProduct);
router.put('/:id', editProduct);
router.post('/', postProduct);

export default router