/*
  Warnings:

  - You are about to drop the column `turma` on the `Aluno` table. All the data in the column will be lost.
  - Added the required column `turma_id` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "turma_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Aluno" ("created_at", "dataNascimento", "email", "endereco", "id", "matricula", "nome", "updated_at") SELECT "created_at", "dataNascimento", "email", "endereco", "id", "matricula", "nome", "updated_at" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
