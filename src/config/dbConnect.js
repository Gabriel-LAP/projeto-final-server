import mongoose from "mongoose"

const dbUser = PROCESS.env.DB_USER
const dbPassword = PROCESS.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ii1tyrp.mongodb.net/?retryWrites=true&w=majority`);

let db = mongoose.connection;

export default db;