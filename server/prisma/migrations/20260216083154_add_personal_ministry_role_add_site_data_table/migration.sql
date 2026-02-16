-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'personal_ministry';

-- CreateTable
CREATE TABLE "church_data" (
    "id" TEXT NOT NULL,
    "library_books" JSONB NOT NULL,
    "singing_groups" JSONB NOT NULL,
    "bible_study" JSONB NOT NULL,
    "calendar_of_events" JSONB NOT NULL,
    "merchandise" JSONB NOT NULL,
    "lesson_study" JSONB NOT NULL,

    CONSTRAINT "church_data_pkey" PRIMARY KEY ("id")
);
