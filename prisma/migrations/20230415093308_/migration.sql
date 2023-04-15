-- CreateTable
CREATE TABLE "Aircraft" (
    "id" SERIAL NOT NULL,
    "aircraftCategory" VARCHAR(255) NOT NULL,
    "aircraftSuperType" VARCHAR(255) NOT NULL,
    "icaoCode" VARCHAR(255) NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bortsBase" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ident" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "superType" VARCHAR(255) NOT NULL,
    "origin" VARCHAR(255) NOT NULL,
    "destination" VARCHAR(255),
    "departure" TIMESTAMPTZ NOT NULL,
    "estimatedArrivalTime" TIMESTAMPTZ,
    "estimatedTimeEnroute" VARCHAR(255),

    CONSTRAINT "bortsBase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bortsBase_origin_destination_departure_idx" ON "bortsBase"("origin", "destination", "departure" DESC);
