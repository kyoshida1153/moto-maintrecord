-- DropForeignKey
ALTER TABLE "public"."maintenance_records" DROP CONSTRAINT "maintenance_records_bike_id_fkey";

-- AlterTable
ALTER TABLE "maintenance_records" ALTER COLUMN "bike_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
