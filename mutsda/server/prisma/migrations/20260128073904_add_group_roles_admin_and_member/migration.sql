/*
  Warnings:

  - The `role` column on the `GroupMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "role",
ADD COLUMN     "role" "GroupRole" NOT NULL DEFAULT 'MEMBER';
