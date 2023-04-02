/*
  Warnings:

  - You are about to drop the `TypeAircraft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borts" DROP CONSTRAINT "Borts_bortsId_fkey";

-- AlterTable
ALTER TABLE "Borts" ADD COLUMN     "type" TEXT,
ALTER COLUMN "destination" DROP NOT NULL,
ALTER COLUMN "departure" DROP NOT NULL;

-- DropTable
DROP TABLE "TypeAircraft";
