import { criarCidade, listarCidades } from "../repositories/cidade.repository";
import { AppError } from "../utils/appError";

interface CadastrarCidadeInput {
    nome: string;
    uf: string;
}

export async function cadastrarCidade(data: CadastrarCidadeInput) {

    if (data.nome.trim().length === 0) {
        throw new AppError("O nome da cidade é obrigatório.", 400);
    }

    const nome = data.nome.trim();

    const uf = data.uf.trim().toUpperCase();

    if (!/^[A-Z]{2}$/.test(uf)) {
        throw new AppError(
            "A UF deve conter exatamente duas letras.",
            400
        );
    }

    return await criarCidade({
        nome,
        uf
    });
}

export async function buscarCidades() {
    return await listarCidades();
}
