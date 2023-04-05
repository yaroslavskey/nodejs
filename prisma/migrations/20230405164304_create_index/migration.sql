-- AlterTable
ALTER TABLE "Borts" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX "Borts_origin_destination_createdAt_idx" ON "Borts"("origin", "destination", "createdAt" DESC);
