/*
  Warnings:

  - Added the required column `userId` to the `event_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_table" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "event_table" ADD CONSTRAINT "event_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
