/*
  Warnings:

  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "capacity" INTEGER,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "minimumBooking" INTEGER,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "pricePerDay" DOUBLE PRECISION,
ADD COLUMN     "pricePerHour" DOUBLE PRECISION,
ADD COLUMN     "pricePerMonth" DOUBLE PRECISION,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "totalArea" INTEGER,
ADD COLUMN     "totalRooms" INTEGER,
ADD COLUMN     "zipCode" TEXT;

-- DropEnum
DROP TYPE "RoomType";
