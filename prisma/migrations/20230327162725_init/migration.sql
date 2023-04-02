-- CreateTable
CREATE TABLE "TypeAircraft" (
    "id" SERIAL NOT NULL,
    "count" TEXT,
    "code" TEXT,
    "aircraftType" TEXT,

    CONSTRAINT "TypeAircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borts" (
    "id" SERIAL NOT NULL,
    "ident" TEXT,
    "origin" TEXT,
    "destination" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "estimatedArrivalTime" TEXT,
    "estimatedTimeEnroute" TEXT,
    "bortsId" INTEGER NOT NULL,

    CONSTRAINT "Borts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeAircraft_code_key" ON "TypeAircraft"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAircraft_aircraftType_key" ON "TypeAircraft"("aircraftType");

-- AddForeignKey
ALTER TABLE "Borts" ADD CONSTRAINT "Borts_bortsId_fkey" FOREIGN KEY ("bortsId") REFERENCES "TypeAircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
