/*
  Warnings:

  - You are about to drop the column `data` on the `Borts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borts" DROP COLUMN "data",
ADD COLUMN     "date" TEXT;
