-- CreateTable
CREATE TABLE "_AlunoToResponsavel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AlunoToResponsavel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AlunoToResponsavel_B_index" ON "_AlunoToResponsavel"("B");

-- AddForeignKey
ALTER TABLE "_AlunoToResponsavel" ADD CONSTRAINT "_AlunoToResponsavel_A_fkey" FOREIGN KEY ("A") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoToResponsavel" ADD CONSTRAINT "_AlunoToResponsavel_B_fkey" FOREIGN KEY ("B") REFERENCES "Responsavel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
