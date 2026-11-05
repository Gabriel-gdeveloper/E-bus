import { AppError } from "../utils/appError";
import bcrypt from "bcryptjs";

export async function gerarHashSenha(senha: string) {
    return await bcrypt.hash(senha, 10);
}
import {
    criarMotorista,
    listarMotoristas
} from "../repositories/motorista.repository"

interface CadastrarMotoristaInput {
    name: string;
    email: string;
    password: string;
    identificacao: string;
    telefone?: string;
}


export async function cadastrarMotorista(
    data: CadastrarMotoristaInput
) {
    if (data.name.trim().length === 0) {
        throw new AppError("O nome do motorista é obrigatório.", 400);
    }

    const email = data.email.trim().toLowerCase();
    if (!email.includes("@") || !email.includes(".")) {
        throw new AppError("E-mail inválido.", 400);
    }

    if (data.password.length < 8) {
        throw new AppError("A senha deve ter pelo menos 8 caracteres.", 400);
    }

    if (data.identificacao.trim().length === 0) {
        throw new AppError("A identificação do motorista é obrigatória.", 400);
    }


    const passwordHash = await gerarHashSenha(data.password);

    return await criarMotorista({
        name: data.name.trim(),
        email: email,
        passwordHash: passwordHash,
        identificacao: data.identificacao.trim(),
        ...(data.telefone !== undefined
            ? { telefone: data.telefone }
            : {})
    });
}   
export async function buscarMotoristas() {
    const motoristas = await listarMotoristas();
    return motoristas;
}
