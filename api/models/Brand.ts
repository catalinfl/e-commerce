import mongoose from "mongoose"

const BrandSchema = new mongoose.Schema<any>(
    {
        mainObject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        brand: { type: String, required: true }
    }
)

export default mongoose.model("Brand", BrandSchema)