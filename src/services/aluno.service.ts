import { criarAluno, listarAlunos } from "../repositories/aluno.repository";
import { AppError } from "../utils/appError";
import { gerarHashSenha } from "../utils/senha";
import { prisma } from "../lib/prisma";

interface CadastrarAlunoInput {
    name: string;
    email: string;
    password: string;
    matricula: string;
    cidade_id: number;
}

export async function cadastrarAluno(data: CadastrarAlunoInput) {
    if (data.name.trim().length === 0) {
        throw new AppError("O nome do aluno é obrigatório.", 400);
    }

    const email = data.email.trim().toLowerCase();

    if (!email.includes("@") || !email.includes(".")) {
        throw new AppError("E-mail inválido.", 400);
    }

    if (data.matricula.trim().length === 0) {
        throw new AppError("O número da matrícula não pode estar vazio.", 400);
    }

    if (data.password.length < 8) {
        throw new AppError("A senha deve conter pelo menos 8 caracteres.",400);
    }

    if (!Number.isInteger(data.cidade_id) || data.cidade_id <= 0) {
        throw new AppError("ID da cidade inválido.", 400);
    }

    const cidade = await prisma.cidade.findUnique({
        where: {
            id: data.cidade_id
        }
    });

    if (!cidade) {
        throw new AppError("Cidade não encontrada.", 404);
    }

    const passwordHash = await gerarHashSenha(data.password);

    return await criarAluno({
        name: data.name.trim(),
        email,
        passwordHash,
        matricula: data.matricula.trim(),
        cidade_id: data.cidade_id
    });
}

export async function buscarAlunos() {
    return await listarAlunos();
}