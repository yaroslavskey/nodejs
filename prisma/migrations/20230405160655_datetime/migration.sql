/*
  Warnings:

  - The `date` column on the `Borts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Borts" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3);
