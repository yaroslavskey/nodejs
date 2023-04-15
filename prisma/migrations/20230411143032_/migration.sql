/*
  Warnings:

  - You are about to alter the column `estimatedTimeEnroute` on the `Borts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Made the column `ident` on table `Borts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `origin` on table `Borts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Borts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `departure` to the `Borts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedArrivalTime` to the `Borts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Borts" ALTER COLUMN "ident" SET NOT NULL,
ALTER COLUMN "origin" SET NOT NULL,
ALTER COLUMN "estimatedTimeEnroute" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "type" SET NOT NULL,
DROP COLUMN "departure",
ADD COLUMN     "departure" TIMESTAMPTZ NOT NULL,
DROP COLUMN "estimatedArrivalTime",
ADD COLUMN     "estimatedArrivalTime" TIMESTAMPTZ NOT NULL;
