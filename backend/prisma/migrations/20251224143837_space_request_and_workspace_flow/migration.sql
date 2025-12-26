/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[approvedFromRequestId]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `ownerType` on the `SpaceRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `Workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_ownerId_fkey";

-- AlterTable
ALTER TABLE "SpaceRequest" DROP COLUMN "ownerType",
ADD COLUMN     "ownerType" "OwnerType" NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "ownerId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "approvedFromRequestId" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_approvedFromRequestId_key" ON "Workspace"("approvedFromRequestId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_approvedFromRequestId_fkey" FOREIGN KEY ("approvedFromRequestId") REFERENCES "SpaceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
