/*
  Warnings:

  - You are about to drop the column `event_end_date` on the `event_table` table. All the data in the column will be lost.
  - You are about to drop the column `event_end_time` on the `event_table` table. All the data in the column will be lost.
  - You are about to drop the column `event_start_date` on the `event_table` table. All the data in the column will be lost.
  - You are about to drop the column `event_start_time` on the `event_table` table. All the data in the column will be lost.
  - Added the required column `start_date_time` to the `event_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_table" DROP COLUMN "event_end_date",
DROP COLUMN "event_end_time",
DROP COLUMN "event_start_date",
DROP COLUMN "event_start_time",
ADD COLUMN     "end_date_time" TIMESTAMP(3),
ADD COLUMN     "start_date_time" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_table" ADD COLUMN     "image_url" TEXT DEFAULT 'LeaderF.png';
