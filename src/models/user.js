import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        cpf: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: Number, required: true },
        address: { type: String, required: true },
        number: { type: Number, required: true },
        zipCode: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        type: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }


    }

);

const users = mongoose.model('users', userSchema);

export default users;