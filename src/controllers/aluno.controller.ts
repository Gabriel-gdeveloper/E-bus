import type { Request, Response } from "express";
import { AppError } from "../utils/appError";
import { cadastrarAluno, 
     buscarAlunos,
     vincularResponsavelService,
     buscarResponsaveisDoAlunoService } from "../services/aluno.service";
import { desvincularResponsavelService } from "../repositories/aluno.repository";

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

export async function vincularResponsavelController(
    req: Request,
    res: Response
) {
    const alunoId = Number(req.params.id);
    const { responsavel_id } = req.body;

    if (typeof responsavel_id !== "number") {
        throw new AppError(
            "O ID do responsável deve ser um número.",
            400
        );
    }

    await vincularResponsavelService(
        alunoId,
        responsavel_id
    );

    return res.status(200).json({
        message: "Responsável vinculado ao aluno com sucesso."
    });
}


export async function listarResponsaveisDoAlunoController(
    req: Request,
    res: Response
) {
    const alunoId = Number(req.params.id);

    const aluno = await buscarResponsaveisDoAlunoService(
        alunoId
    );

    return res.status(200).json(aluno);
}



export async function desvincularResponsavelController(
    req: Request,
    res: Response
) {
    const alunoId = Number(req.params.id);

    const responsavelId = Number(
        req.params.responsavelId
    );

    await desvincularResponsavelService(
        alunoId,
        responsavelId
    );

    return res.status(200).json({
        message: "Responsável desvinculado do aluno com sucesso."
    });
}
