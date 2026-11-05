/*
  Warnings:

  - Added the required column `tipo` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('ADMINISTRADOR', 'MOTORISTA', 'ALUNO', 'RESPONSAVEL');

-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "tipo" "TipoPessoa" NOT NULL;

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "pessoa_id" INTEGER NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_pessoa_id_key" ON "Administrador"("pessoa_id");

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
