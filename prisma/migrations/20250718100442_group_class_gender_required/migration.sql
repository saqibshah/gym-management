/*
  Warnings:

  - Made the column `gender` on table `GroupClass` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GroupClass" ALTER COLUMN "gender" SET NOT NULL;
