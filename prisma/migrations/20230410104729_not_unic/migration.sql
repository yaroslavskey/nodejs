-- DropIndex
DROP INDEX "Borts_ident_key";

-- AlterTable
ALTER TABLE "Borts" ALTER COLUMN "ident" DROP NOT NULL;
