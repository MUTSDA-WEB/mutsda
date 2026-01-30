/*
  Warnings:

  - Added the required column `category` to the `event_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_table" ADD COLUMN     "category" TEXT NOT NULL;
