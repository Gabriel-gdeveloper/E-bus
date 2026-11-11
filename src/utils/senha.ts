import bcrypt from "bcryptjs";

export async function gerarHashSenha(senha: string) {
    return await bcrypt.hash(senha, 10);
}