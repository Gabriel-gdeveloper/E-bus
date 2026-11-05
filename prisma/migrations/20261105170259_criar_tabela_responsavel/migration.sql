-- CreateTable
CREATE TABLE "Responsavel" (
    "id" SERIAL NOT NULL,
    "telefone" TEXT,
    "pessoa_id" INTEGER NOT NULL,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_pessoa_id_key" ON "Responsavel"("pessoa_id");

-- AddForeignKey
ALTER TABLE "Responsavel" ADD CONSTRAINT "Responsavel_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
