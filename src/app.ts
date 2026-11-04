import express from "express";
import motoristaRoutes from "./routes/motorista.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/motoristas", motoristaRoutes);

app.use(errorMiddleware);

export default app;