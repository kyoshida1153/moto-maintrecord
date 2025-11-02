-- DropForeignKey
ALTER TABLE "public"."maintenance_categories" DROP CONSTRAINT "maintenance_categories_user_id_fkey";

-- AddForeignKey
ALTER TABLE "maintenance_categories" ADD CONSTRAINT "maintenance_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
