ALTER TABLE "user_table" ADD COLUMN "reset_token_hash" TEXT;
ALTER TABLE "user_table" ADD COLUMN "reset_token_expires_at" TIMESTAMP(3);
CREATE UNIQUE INDEX "user_table_reset_token_hash_key" ON "user_table"("reset_token_hash");