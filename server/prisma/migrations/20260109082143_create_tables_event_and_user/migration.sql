-- CreateTable
CREATE TABLE "user_table" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_table" (
    "event_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "event_start_date" TIMESTAMP(3) NOT NULL,
    "event_end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_table_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_table_id_key" ON "user_table"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_email_key" ON "user_table"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_username_key" ON "user_table"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_password_key" ON "user_table"("password");
