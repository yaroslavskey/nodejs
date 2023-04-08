/*
  Warnings:

  - You are about to alter the column `ident` on the `Borts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Made the column `ident` on table `Borts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Borts" ALTER COLUMN "ident" SET NOT NULL,
ALTER COLUMN "ident" SET DATA TYPE VARCHAR(255);
