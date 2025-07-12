/*
  Warnings:

  - A unique constraint covering the columns `[trainerNumber]` on the table `Trainer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trainerNumber` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trainer" ADD COLUMN     "trainerNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_trainerNumber_key" ON "Trainer"("trainerNumber");
