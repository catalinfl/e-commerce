import mongoose from "mongoose"

interface Product {
    name: string;
    price: string;
    warranty?: string,
    installService?: string,
    description: string,
    specifications: string,
    reviewStars: string,
    reviewComments: string | string[],
    ask: string | string[]
    categories: string,
    img: string[],
    subcategory?: string,
    oldPrice?: string,
    productCode: string,
    inStock: string,
    top: boolean
}

const ProductSchema = new mongoose.Schema<Product>(
    {
        name: { type: String, required: true},
        price: { type: String, required: true},
        warranty: { type: String, required: true},
        description: { type: String, required: true},
        reviewStars: { type: String },
        specifications: { type: String, required: true},
        reviewComments: { type: String },
        installService: { type: String },
        oldPrice: { type: String }, 
        ask: [{ type: String }],
        categories: { type: String, required: true},
        subcategory: { type: String },
        img: [{ type: String, required: true}],
        productCode: { type: String, unique: true, required: true},
        inStock: {type: String, required: true},
        top: { type: Boolean }
    },
    {timestamps: true}
    )


export default mongoose.model("Product", ProductSchema);