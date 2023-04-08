/*
  Warnings:

  - A unique constraint covering the columns `[ident]` on the table `Borts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Borts_ident_key" ON "Borts"("ident");
