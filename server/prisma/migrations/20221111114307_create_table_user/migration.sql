/*
  Warnings:

  - You are about to drop the column `cep` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "pis" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("cpf", "email", "id", "name", "password", "pis") SELECT "cpf", "email", "id", "name", "password", "pis" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE UNIQUE INDEX "User_pis_key" ON "User"("pis");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
