-- AlterTable
ALTER TABLE "Borts" ALTER COLUMN "departure" DROP NOT NULL,
ALTER COLUMN "departure" SET DATA TYPE TEXT,
ALTER COLUMN "estimatedArrivalTime" DROP NOT NULL,
ALTER COLUMN "estimatedArrivalTime" SET DATA TYPE TEXT;
