-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_restaurantId_fkey";

-- AlterTable
ALTER TABLE "productionPlan" ADD COLUMN     "status" "ProductionStatus" NOT NULL DEFAULT 'HAS_NOT_START';

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
