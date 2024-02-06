import mongoose from 'mongoose'

const partSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        purchasePrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        brand: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'partsCategory', required: true },

    }
)

const parts = mongoose.model('parts', partSchema);

export default parts