import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

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

export async function vincularResponsavel(
    alunoId: number,
    responsavelId: number
) {
    return await prisma.aluno.update({
        where: {
            id: alunoId
        },
        data: {
            responsaveis: {
                connect: {
                    id: responsavelId
                }
            }
        }
    });
}

export async function buscarAlunoPorId(id: number) {
    return await prisma.aluno.findUnique({
        where: {
            id
        },
        include: {
            responsaveis: {
                select: {
                    id: true
                }
            }
        }
    });
}

export async function buscarResponsavelPorId(id: number) {
    return await prisma.responsavel.findUnique({
        where: {
            id
        }
    });
}

export async function listarResponsaveisDoAluno(alunoId: number) {
    return await prisma.aluno.findUnique({
        where: {
            id: alunoId
        },
        select: {
            id: true,
            matricula: true,

            responsaveis: {
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
            }
        }
    });
}


export async function desvincularResponsavel(
    alunoId: number,
    responsavelId: number
) {
    return await prisma.aluno.update({
        where: {
            id: alunoId
        },
        data: {
            responsaveis: {
                disconnect: {
                    id: responsavelId
                }
            }
        }
    });
}


export async function desvincularResponsavelService(
    alunoId: number,
    responsavelId: number
) {
    if (
        !Number.isInteger(alunoId) ||
        alunoId <= 0 ||
        !Number.isInteger(responsavelId) ||
        responsavelId <= 0
    ) {
        throw new AppError("IDs inválidos.", 400);
    }

    // 2. Verificar se o aluno existe
    const aluno = await buscarAlunoPorId(alunoId);

    if (!aluno) {
        throw new AppError("Aluno não encontrado.", 404);
    }

    const responsavel = await buscarResponsavelPorId(
        responsavelId
    );

    if (!responsavel) {
        throw new AppError("Responsável não encontrado.", 404);
    }

    const estaVinculado = aluno.responsaveis.some(
        responsavel => responsavel.id === responsavelId
    );

    if (!estaVinculado) {
        throw new AppError(
            "Este responsável não está vinculado ao aluno.",
            404
        );
    }

    return await desvincularResponsavel(
        alunoId,
        responsavelId
    );
}

