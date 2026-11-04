import { Router } from "express";
import { cadastrarMotoristaController } from "../controllers/motorista.controller";

const motoristaRoutes = Router();

motoristaRoutes.post(
    "/",
    cadastrarMotoristaController
);

export default motoristaRoutes;
