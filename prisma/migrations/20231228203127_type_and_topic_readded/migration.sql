/*
  Warnings:

  - Added the required column `type` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "topic" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;
