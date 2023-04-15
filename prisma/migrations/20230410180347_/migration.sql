/*
  Warnings:

  - You are about to alter the column `ident` on the `Borts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `origin` on the `Borts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `destination` on the `Borts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `type` on the `Borts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `departure` to the `Borts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedArrivalTime` to the `Borts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Borts" ALTER COLUMN "ident" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "origin" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "destination" SET DATA TYPE VARCHAR(255),
DROP COLUMN "departure",
ADD COLUMN     "departure" TIMESTAMPTZ NOT NULL,
DROP COLUMN "estimatedArrivalTime",
ADD COLUMN     "estimatedArrivalTime" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(255);
