-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING';
