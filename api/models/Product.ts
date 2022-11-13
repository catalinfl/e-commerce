import mongoose from "mongoose"

interface Product {
    name: string;
    price: string;
    warranty: string,
    description: string,
    specifications: string,
    reviewStars: string,
    ask: String | String[],
    images: string,
    categories: string,
    img: Array<String>

}

const ProductSchema = new mongoose.Schema<Product>(
    {
        name: { type: String, required: true},
        price: { type: String, required: true},
        warranty: { type: String, required: true},
        description: { type: String, required: true},
        specifications: { type: String, required: true},
        reviewStars: { type: String },
        ask: { type: Array },
        images: { type: String },
        categories: { type: String },
        img: [{ type: String, required: true}]
    },
    {timestamps: true}
    )


export default mongoose.model("Product", ProductSchema);