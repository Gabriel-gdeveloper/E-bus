import { prisma } from "../lib/prisma";

export async function listarResponsaveis() {
    return await prisma.responsavel.findMany({
       select: {
            id: true,
            telefone: true,
            pessoa: {
                select: {
                    name: true,
                    email: true
                }
            }
       }
    });
}


interface CriarResponsavelData {
    name: string;
    email: string;
    passwordHash: string;
    telefone?: string;
}

export async function criarResponsavel(data: CriarResponsavelData) {
    return await prisma.pessoa.create({
        data: {
            name:data.name,
            email:data.email,
            password:data.passwordHash,
            tipo:"RESPONSAVEL",
            responsavel: {
                create: {
                    telefone: data.telefone ?? null
                }
            }
        }
    });
}
