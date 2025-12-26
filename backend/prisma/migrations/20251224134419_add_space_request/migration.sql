-- CreateEnum
CREATE TYPE "SpaceRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('individual', 'company');

-- CreateTable
CREATE TABLE "SpaceRequest" (
    "id" SERIAL NOT NULL,
    "ownerType" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerDocument" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "spaceName" TEXT NOT NULL,
    "spaceType" TEXT NOT NULL,
    "spaceDescription" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" INTEGER,
    "capacity" INTEGER,
    "rooms" INTEGER,
    "pricePerHour" DOUBLE PRECISION,
    "pricePerDay" DOUBLE PRECISION,
    "pricePerMonth" DOUBLE PRECISION,
    "minimumBooking" INTEGER,
    "additionalInfo" TEXT,
    "amenities" TEXT[],
    "images" TEXT[],
    "status" "SpaceRequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedById" INTEGER,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpaceRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpaceRequest" ADD CONSTRAINT "SpaceRequest_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
