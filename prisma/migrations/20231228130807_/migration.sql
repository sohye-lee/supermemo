/*
  Warnings:

  - Added the required column `userId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "type" SET DEFAULT 'Member';

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
