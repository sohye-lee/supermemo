/*
  Warnings:

  - You are about to drop the column `topic` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `know` on the `Question` table. All the data in the column will be lost.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "topic",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "know",
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Know" (
    "id" SERIAL NOT NULL,
    "know" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Know_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Know" ADD CONSTRAINT "Know_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Know" ADD CONSTRAINT "Know_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
