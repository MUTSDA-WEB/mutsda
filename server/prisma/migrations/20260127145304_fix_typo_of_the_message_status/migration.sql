/*
  Warnings:

  - Changed the type of `message_status` on the `conversation_table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ');

-- AlterTable
ALTER TABLE "conversation_table" DROP COLUMN "message_status",
ADD COLUMN     "message_status" "MessageStatus" NOT NULL;

-- DropEnum
DROP TYPE "MesageStatus";
