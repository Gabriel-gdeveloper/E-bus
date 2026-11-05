import { Router } from "express";
import { cadastrarMotoristaController, listarMotoristasController } from "../controllers/motorista.controller";

const motoristaRoutes = Router();

motoristaRoutes.post(
    "/",
    cadastrarMotoristaController
);

motoristaRoutes.get(
    "/",
     listarMotoristasController)

     
export default motoristaRoutes;
