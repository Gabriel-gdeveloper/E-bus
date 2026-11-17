import {prisma} from "../lib/prisma"

interface CriarCidadeData{
    nome: string
    uf: string
}

export async function criarCidade(data: CriarCidadeData) {
    return await prisma.cidade.create({
        data: {
            nome: data.nome,
            uf: data.uf
        }
    });
}

export async function listarCidades() {
    return await prisma.cidade.findMany({
        select: {
            id: true,
            nome: true,
            uf: true
        },
        orderBy: {
            nome: "asc"
        }
    });
}