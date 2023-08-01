import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ii1tyrp.mongodb.net/`);

let db = mongoose.connection;

export default db;