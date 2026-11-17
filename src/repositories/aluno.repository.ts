import { prisma } from "../lib/prisma";

interface criarAlunoData {
    name: string;
    email: string;
    passwordHash: string;
    matricula: string;
    cidade_id: number;
}

export async function criarAluno(data: criarAlunoData) {
    return await prisma.pessoa.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.passwordHash,
            tipo: "ALUNO",

            aluno: {
                create: {
                    matricula: data.matricula,
                    cidade: {
                        connect: {
                            id: data.cidade_id
                        }
                    }

                }
            }
        }
    });
}

export async function listarAlunos() {
    return await prisma.aluno.findMany({
        select: {
    id: true,
    matricula: true,

    pessoa: {
        select: {
            name:true,
            email:true
        }
    },

    cidade: {
        select: {
            id:true,
            nome:true,
            uf:true
        }
    }
}
    });
}