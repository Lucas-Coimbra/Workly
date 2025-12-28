-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "twoFactorExpiresAt" TIMESTAMP(3),
ADD COLUMN     "twoFactorTempCode" TEXT;
