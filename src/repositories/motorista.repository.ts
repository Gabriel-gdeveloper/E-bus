import { prisma } from "../lib/prisma";

export async function listarMotoristas() {
    return await prisma.motorista.findMany();
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
            name: data.name.trim(),
            email: data.email,
            password: data.passwordHash,
            motorista: {
                create: {
                    identificacao: data.identificacao,
                    telefone: data.telefone ?? null
                }
            }
        }
    });
}
