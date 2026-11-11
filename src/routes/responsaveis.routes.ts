import { Router } from "express";
import { cadastrarResponsavelController, listarResponsaveisController } from "../controllers/responsavel.controller";

const responsavelRoutes = Router();

responsavelRoutes.post(
    "/",
    cadastrarResponsavelController
)

responsavelRoutes.get(
    "/",
    listarResponsaveisController
)
     
export default responsavelRoutes;
