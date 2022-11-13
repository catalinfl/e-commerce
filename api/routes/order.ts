import express, { NextFunction, Request, Response } from "express"
import { login, register } from "../controllers/auth";
import Order from "../models/Order";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../utils/verifyToken";
import { createError } from "../utils/error";
import { postOrder, editOrder, getOrder, getOrders } from "../controllers/order";

const router = express.Router();

router.get("/:id", verifyToken, getOrder);
router.post("/", verifyTokenAndAdmin, postOrder);
router.put(":/id", verifyToken, editOrder);
router.get("/", verifyToken, getOrders);


export default router;



