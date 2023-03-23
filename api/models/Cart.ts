import mongoose, { Collection, Model, Mongoose } from 'mongoose'


type Product = {
    productId: string,
    quantity: number,
}

interface Cart {
    userId: mongoose.Schema.Types.ObjectId;
    products: [Product]
}


const CartSchema = new mongoose.Schema<Cart>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    products: [{
        productId: { type: String, required: true},
        quantity: { type: Number, default: 1}
    }]
}, {timestamps: true})




export default mongoose.model("Schema", CartSchema);