/*
  Warnings:

  - You are about to drop the column `date` on the `Borts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borts" DROP COLUMN "date",
ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;
