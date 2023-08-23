/*
  Warnings:

  - Added the required column `max_occupancy` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "max_occupancy" TEXT NOT NULL;
