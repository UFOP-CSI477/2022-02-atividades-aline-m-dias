/*
  Warnings:

  - Added the required column `tarefa_id` to the `Diciplina` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Entregas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataEntrega" DATETIME NOT NULL,
    "notas" INTEGER NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    CONSTRAINT "Entregas_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cargaHoraria" TEXT NOT NULL,
    "Universidade" TEXT NOT NULL,
    "professor_id" INTEGER NOT NULL,
    "tarefa_id" INTEGER NOT NULL,
    CONSTRAINT "Diciplina_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diciplina" ("Universidade", "cargaHoraria", "id", "nome", "professor_id") SELECT "Universidade", "cargaHoraria", "id", "nome", "professor_id" FROM "Diciplina";
DROP TABLE "Diciplina";
ALTER TABLE "new_Diciplina" RENAME TO "Diciplina";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
