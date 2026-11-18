import type { Request, Response } from "express";
import { AppError } from "../utils/appError";
import { cadastrarCidade, buscarCidades } from "../services/cidade.service";

export async function cadastrarCidadeController(
    req: Request,
    res: Response
){
    const {nome, uf } = req.body;
    if(
        typeof nome !== "string" ||
        typeof uf !== "string"  
    )
    {
        throw new AppError(
            "dados inválidos para cadastro de cidade",
            400
        );
    }
    await cadastrarCidade({
        nome,
        uf
    });

    return res.status(201).json({
        message: "Cidade cadastrada com sucesso"
    });
}

export async function listarCidadesController(
    req: Request,
    res: Response
) {
    const cidades = await buscarCidades();

    return res.status(200).json(cidades);
}



