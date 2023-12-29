/*
  Warnings:

  - You are about to drop the column `liked` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Know" ADD COLUMN     "save" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "liked";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "memoId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_memoId_fkey" FOREIGN KEY ("memoId") REFERENCES "Memo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
