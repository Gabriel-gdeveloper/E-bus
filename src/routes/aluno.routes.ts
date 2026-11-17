import { Router } from "express";
import { cadastrarAlunoController, listarAlunosController } from "../controllers/aluno.controller";

const alunoRoutes = Router();

alunoRoutes.post(
    "/",
    cadastrarAlunoController
);

alunoRoutes.get(
    "/",
    listarAlunosController
);

export default alunoRoutes