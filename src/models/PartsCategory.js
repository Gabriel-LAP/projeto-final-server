import mongoose from 'mongoose'

const partsCategorySchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },

    }
)

const partsCategory = mongoose.model('partsCategory', partsCategorySchema);

export default partsCategory