import mongoose from "mongoose"

mongoose.connect("mongodb+srv://gabriel:123@cluster0.ii1tyrp.mongodb.net/?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;