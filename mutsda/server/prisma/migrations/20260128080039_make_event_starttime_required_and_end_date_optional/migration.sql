/*
  Warnings:

  - Made the column `event_start_time` on table `event_table` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event_table" ALTER COLUMN "event_end_date" DROP NOT NULL,
ALTER COLUMN "event_start_time" SET NOT NULL;

-- AlterTable
ALTER TABLE "group_table" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
