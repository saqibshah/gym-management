/*
  Warnings:

  - Changed the type of `shift` on the `Trainer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TrainerShift" AS ENUM ('morning', 'evening', 'both');

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "shift",
ADD COLUMN     "shift" "TrainerShift" NOT NULL;
