import type { Request, Response } from "express";
import { cadastrarResponsavel, buscarResponsaveis } from "../services/responsavel.service";
import { AppError } from "../utils/appError";

export async function cadastrarResponsavelController(
    req: Request,
    res: Response
) {
    const dados = req.body;
    if (
        !dados ||
        typeof dados.name !== "string" ||
        typeof dados.email !== "string" ||
        typeof dados.password !== "string"
    ) {
        throw new AppError(
            "Os dados obrigatórios do responsável são inválidos.",
            400
        );
    }
    if (
        dados.telefone !== undefined &&
        typeof dados.telefone !== "string"
    ) {
        throw new AppError(
            "O telefone deve ser uma string.",
            400
        );
    }
    await cadastrarResponsavel(dados);


    return res.status(201).json({
    message: "Responsável cadastrado com sucesso."
});
}

export async function listarResponsaveisController(
    req: Request,
    res: Response
) {
    const responsaveis = await buscarResponsaveis();
    return res.status(200).json(responsaveis)
}

