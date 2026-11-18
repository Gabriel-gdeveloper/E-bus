import { Router } from "express";
import { 
    cadastrarAlunoController,
    listarAlunosController,
    vincularResponsavelController,
    listarResponsaveisDoAlunoController,
    desvincularResponsavelController
 } from "../controllers/aluno.controller";

const alunoRoutes = Router();

alunoRoutes.post(
    "/",
    cadastrarAlunoController
);

alunoRoutes.get(
    "/",
    listarAlunosController
);

alunoRoutes.post(
    "/:id/responsaveis",
    vincularResponsavelController
);

alunoRoutes.get(
    "/:id/responsaveis",
    listarResponsaveisDoAlunoController
);

alunoRoutes.delete(
    "/:id/responsaveis/:responsavelId",
    desvincularResponsavelController
);

export default alunoRoutes