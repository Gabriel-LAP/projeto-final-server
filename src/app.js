import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import cors from "cors"

// const corsOptions = {
//     origin: "http://localhost:5173",
//     optionsSuccessStatus: 200

// }

db.on("error", () => console.log('Erro de conexão'))
db.once("open", () => {
    console.log('conexão com o banco feita com sucesso')
})

const app = express();

app.use(cors({ origin: '*' }))
app.use(express.json())
routes(app);

export default app