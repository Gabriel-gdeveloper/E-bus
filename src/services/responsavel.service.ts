import { criarResponsavel, listarResponsaveis } from "../repositories/responsavel.repository";
import { gerarHashSenha } from "../utils/senha";
import { AppError } from "../utils/appError";

interface CadastrarResponsavelInput {
    name: string;
    email: string;
    password: string;
    telefone?: string;
}

export async function cadastrarResponsavel(
    data: CadastrarResponsavelInput) {
    if (data.name.trim().length === 0) {
        throw new AppError("O nome do responsável é obrigatório.", 400);
    }

    const email = data.email.trim().toLowerCase();
    if (!email.includes("@") || !email.includes(".")) {
        throw new AppError("E-mail inválido.", 400);
    }

    if (data.password.length < 8) {
        throw new AppError("A senha deve conter pelo menos 8 caracteres.", 400);
    }

    const passwordHash = await gerarHashSenha(data.password);

    return await criarResponsavel({
    name: data.name.trim(),
    email: email,
    passwordHash: passwordHash,
     ...(data.telefone !== undefined
            ? { telefone: data.telefone }
            : {})
});
}

export async function buscarResponsaveis() {
    const responsaveis = await listarResponsaveis();

    return responsaveis;
}