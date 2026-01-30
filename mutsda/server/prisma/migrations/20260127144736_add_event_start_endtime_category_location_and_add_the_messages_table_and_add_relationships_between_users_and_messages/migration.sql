-- CreateEnum
CREATE TYPE "ConvoType" AS ENUM ('COMMUNITY', 'GROUP', 'DIRECT', 'VISITOR');

-- CreateEnum
CREATE TYPE "MesageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ');

-- AlterTable
ALTER TABLE "event_table" ADD COLUMN     "event_end_time" TIMESTAMP(3),
ADD COLUMN     "event_location" TEXT,
ADD COLUMN     "event_start_time" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "conversation_table" (
    "message_id" TEXT NOT NULL,
    "message_type" "ConvoType" NOT NULL,
    "message_status" "MesageStatus" NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receiverId" TEXT,

    CONSTRAINT "conversation_table_pkey" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "conversation_table" ADD CONSTRAINT "conversation_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
