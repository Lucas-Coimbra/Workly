/*
  Warnings:

  - Added the required column `mode` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReservationMode" AS ENUM ('HOURLY', 'DAILY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "mode" "ReservationMode" NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "spaceType" TEXT;
