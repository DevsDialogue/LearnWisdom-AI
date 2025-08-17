/*
  Warnings:

  - You are about to drop the column `stripe_current_period_end` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `UserSubscription` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_unitId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_courseId_fkey";

-- DropIndex
DROP INDEX "sessionUserId";

-- DropIndex
DROP INDEX "userId";

-- DropIndex
DROP INDEX "UserSubscription_stripe_customer_id_key";

-- DropIndex
DROP INDEX "UserSubscription_stripe_subscription_id_key";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "stripe_current_period_end",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "stripe_price_id",
DROP COLUMN "stripe_subscription_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "razorpaySignature" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "unitId" RENAME TO "Chapter_unitId_idx";

-- RenameIndex
ALTER INDEX "chapterId" RENAME TO "Question_chapterId_idx";

-- RenameIndex
ALTER INDEX "courseId" RENAME TO "Unit_courseId_idx";
