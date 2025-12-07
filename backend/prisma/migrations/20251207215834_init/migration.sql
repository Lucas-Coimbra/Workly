/*
  Warnings:

  - The values [PRIVATE,MEETING,SHARED] on the enum `RoomType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Room` table. All the data in the column will be lost.
  - Added the required column `workspaceId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoomType_new" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');
ALTER TABLE "Room" ALTER COLUMN "type" TYPE "RoomType_new" USING ("type"::text::"RoomType_new");
ALTER TYPE "RoomType" RENAME TO "RoomType_old";
ALTER TYPE "RoomType_new" RENAME TO "RoomType";
DROP TYPE "public"."RoomType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "status",
DROP COLUMN "totalPrice",
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "price",
ADD COLUMN     "workspaceId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "ReservationStatus";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
