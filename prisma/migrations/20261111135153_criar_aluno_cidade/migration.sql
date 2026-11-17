-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "matricula" TEXT NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    "cidade_id" INTEGER NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_pessoa_id_key" ON "Aluno"("pessoa_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_nome_uf_key" ON "Cidade"("nome", "uf");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
