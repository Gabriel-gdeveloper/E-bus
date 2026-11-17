import express from "express";

import motoristaRoutes from "./routes/motorista.routes";
import responsavelRoutes from "./routes/responsaveis.routes";
import alunoRoutes from "./routes/aluno.routes";

import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/motoristas", motoristaRoutes);
app.use("/alunos", alunoRoutes);
app.use("/responsaveis", responsavelRoutes);

app.use(errorMiddleware);

export default app;

