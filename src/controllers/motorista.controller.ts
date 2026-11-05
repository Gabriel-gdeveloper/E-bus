import type { Request, Response } from "express";
import { cadastrarMotorista,buscarMotoristas } from "../services/motorista.service";
import { AppError } from "../utils/appError";


export async function cadastrarMotoristaController(
    req: Request,
    res: Response
) {
    const dados = req.body;
    if (
        !dados ||
        typeof dados.name !== "string" ||
        typeof dados.email !== "string" ||
        typeof dados.password !== "string" ||
        typeof dados.identificacao !== "string"
    ) {
        throw new AppError(
            "Os dados obrigatórios do motorista são inválidos.",
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


    await cadastrarMotorista(dados);

    return res.status(201).json({
        message: "Motorista cadastrado com sucesso."
    });
}

export async function listarMotoristasController(
    req: Request,
    res: Response
) {
    const motoristas = await buscarMotoristas();

    return res.status(200).json(motoristas);
}
