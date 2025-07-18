/*
  Warnings:

  - You are about to drop the column `trainerNumber` on the `Trainer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Trainer_trainerNumber_key";

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "trainerNumber";
