import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        id: { type: String },
        brand: { type: String, required: true },
        device: { type: String, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
        faulty: { type: String, required: true },
        parts: { type: String },
        price: { type: Number },
        statusOrder: { type: String, required: true },
        creationDate: { type: Date, default: Date.now },
        estimatedDate: { type: Date },
        completionDate: { type: Date },
        guarantee: { type: String, required: true },
        userdPart: { type: String },

    }

);

const orders = mongoose.model('orders', orderSchema);

export default orders;