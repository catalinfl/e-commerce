import mongoose, { Collection, Model } from 'mongoose'


type Product = {
    productId: string,
    quantity: number,
}

interface Cart {
    userId: string;
    products: [Product]
}


const CartSchema = new mongoose.Schema<Cart>({
    userId: { type: String, required: true},
    products: [{
        productId: { type: String, required: true},
        quantity: { type: Number, default: 1}
    }]
}, {timestamps: true})



export default mongoose.model("Schema", CartSchema);