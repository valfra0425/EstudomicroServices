import express from 'express';
import "./infra/provider/kafka/consumer/index"
import "./infra/provider/kafka/consumer/index2"
import * as dotenv from 'dotenv';
dotenv.config();
import { router } from "./infra/routes";

// inicialização do server express

const PORT = process.env.PORT ?? 3001;

const app = express()
app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`Server order is running on PORT ${PORT}`))