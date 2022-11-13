import { decodeBase64 } from "bcryptjs";
import mongoose from "mongoose";

type Product = {
    productId: string,
    quantity: number,
}

export interface Order {
    userId: string,
    products: [Product],
    amount: { type: number },
    address: { type: Object },
    status: string,
}


const OrderSchema = new mongoose.Schema<Order>({
    userId: { type: String, required: true},
    products: [{
        productId: { type: String, required: true},
        quantity: { type: Number, default: 2}
    }],
    amount: { type: Number, required: true},
    address: { type: Object, required: true},
    status: { type: String, default: "pending", required: true},
}, {timestamps: true})



export default mongoose.model("Order", OrderSchema);