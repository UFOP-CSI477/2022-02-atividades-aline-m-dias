-- CreateTable
CREATE TABLE "Diciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cargaHoraria" TEXT NOT NULL,
    "Universidade" TEXT NOT NULL,
    "professor_id" INTEGER NOT NULL,
    CONSTRAINT "Diciplina_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
