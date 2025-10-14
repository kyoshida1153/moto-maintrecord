-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMPTZ,
    "image" TEXT,
    "hashed_password" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bikes" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "mileage" INTEGER,
    "memo" VARCHAR(500),
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "bikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_records" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "bike_id" UUID NOT NULL,
    "maintenance_category_id" UUID,
    "calender_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(500) NOT NULL,
    "cost" INTEGER NOT NULL,
    "memo" VARCHAR(500),
    "mileage" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "maintenance_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_record_images" (
    "id" UUID NOT NULL,
    "maintenance_record_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "maintenance_record_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_categories" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "maintenance_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "bikes_user_id_idx" ON "bikes"("user_id");

-- CreateIndex
CREATE INDEX "maintenance_records_user_id_bike_id_maintenance_category_id_idx" ON "maintenance_records"("user_id", "bike_id", "maintenance_category_id", "calender_date", "cost");

-- CreateIndex
CREATE INDEX "maintenance_record_images_maintenance_record_id_idx" ON "maintenance_record_images"("maintenance_record_id");

-- CreateIndex
CREATE INDEX "maintenance_categories_user_id_idx" ON "maintenance_categories"("user_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bikes" ADD CONSTRAINT "bikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_maintenance_category_id_fkey" FOREIGN KEY ("maintenance_category_id") REFERENCES "maintenance_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_record_images" ADD CONSTRAINT "maintenance_record_images_maintenance_record_id_fkey" FOREIGN KEY ("maintenance_record_id") REFERENCES "maintenance_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_categories" ADD CONSTRAINT "maintenance_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
