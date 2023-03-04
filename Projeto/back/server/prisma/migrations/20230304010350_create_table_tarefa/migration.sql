-- CreateTable
CREATE TABLE "Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "professor_id" INTEGER NOT NULL,
    CONSTRAINT "Turma_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataEntrega" DATETIME NOT NULL,
    "turma_id" INTEGER NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    CONSTRAINT "Tarefa_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
