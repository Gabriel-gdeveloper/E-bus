import type { Request, Response } from "express";
import { AppError } from "../utils/appError";
import { cadastrarAluno, buscarAlunos } from "../services/aluno.service";

export async function cadastrarAlunoController(
    req: Request,
    res: Response
) {
    const { name, email, password, matricula, cidade_id } = req.body;

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof matricula !== "string" ||
        typeof cidade_id !== "number"
    ) {
        throw new AppError("Dados inválidos para cadastro do aluno.", 400);
    }

    await cadastrarAluno({
        name,
        email,
        password,
        matricula,
        cidade_id
    });

    return res.status(201).json({
        message: "Aluno cadastrado com sucesso."
    });
}

export async function listarAlunosController(
    req: Request,
    res: Response
) {
    const alunos = await buscarAlunos();
    return res.status(200).json(alunos)
}