/*
  Warnings:

  - You are about to alter the column `title` on the `maintenance_records` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "bikes" ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "maintenance_categories" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ,
ADD COLUMN     "updated_at" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "maintenance_records" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);
