import { prisma } from "../lib/prisma";

export async function listarMotoristas() {
    return await prisma.motorista.findMany({
        select: {
            id: true,
            identificacao: true,
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

interface CriarMotoristaData {
    name: string;
    email: string;
    passwordHash: string;
    identificacao: string;
    telefone?: string;
}
export async function criarMotorista(data: CriarMotoristaData) {
    return await prisma.pessoa.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.passwordHash,
            tipo: "MOTORISTA",
            motorista: {
                create: {
                    identificacao: data.identificacao,
                    telefone: data.telefone ?? null
                }
            }
        }
    });
}
