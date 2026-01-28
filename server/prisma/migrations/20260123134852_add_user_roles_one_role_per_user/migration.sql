/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `user_table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `user_table` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `user_table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN1', 'ADMIN2', 'ELDER1', 'ELDER2', 'ELDER3', 'CHURCHLEADER', 'HEADDEACON', 'HEADDEACONNESS', 'SABBATHSCHOOL', 'TREASURER', 'CLERK', 'ALO', 'AMO', 'PROPHECY', 'STEWARDSHIP', 'MUSIC', 'WELFARE', 'DEVELOPMENT', 'COMMUNICATION');

-- AlterTable
ALTER TABLE "user_table" ADD COLUMN     "phone_number" INTEGER NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_table_role_key" ON "user_table"("role");
