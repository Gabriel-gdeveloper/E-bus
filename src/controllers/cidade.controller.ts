import type {Request, Response } from "express";
import { criarCidade, listarCidades } from "../repositories/cidade.repository";
import { AppError } from "../utils/appError";
import { request } from "node:http";

export async function cadastrarCidadeController(
    req: Request,
    res: Response
){
    


}



