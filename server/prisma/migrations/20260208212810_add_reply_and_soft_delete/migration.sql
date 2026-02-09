-- AlterTable
ALTER TABLE "conversation_table" ADD COLUMN     "deleted_for" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "reply_to_id" TEXT;

-- AddForeignKey
ALTER TABLE "conversation_table" ADD CONSTRAINT "conversation_table_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "conversation_table"("message_id") ON DELETE SET NULL ON UPDATE CASCADE;
