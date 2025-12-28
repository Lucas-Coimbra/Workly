/*
  Warnings:

  - You are about to drop the column `roomId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `paymentType` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('HOURLY', 'DAILY', 'MONTHLY');

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "roomId",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "paymentType" "PaymentType" NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "workspaceId" INTEGER NOT NULL,
ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
