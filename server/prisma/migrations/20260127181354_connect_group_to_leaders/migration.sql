-- AlterTable
ALTER TABLE "conversation_table" ADD COLUMN     "groupId" TEXT;

-- CreateTable
CREATE TABLE "group_table" (
    "group_id" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,

    CONSTRAINT "group_table_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "group_table_group_name_key" ON "group_table"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_userId_groupId_key" ON "GroupMember"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group_table"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
