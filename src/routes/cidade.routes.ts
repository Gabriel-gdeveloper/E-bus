import { Router } from "express";
import { cadastrarCidadeController,listarCidadesController } from "../controllers/cidade.controller";

const cidadeRoutes = Router();

cidadeRoutes.post(
    "/",
    cadastrarCidadeController
)

cidadeRoutes.get(
    "/",
    listarCidadesController
)

export default cidadeRoutes