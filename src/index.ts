import express from "express";
import cors from "cors";
import { productRouter } from "./routers/productRouter";


const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => console.log("server rodando na 3003"));

// ROTAS
app.use("/products", productRouter)



