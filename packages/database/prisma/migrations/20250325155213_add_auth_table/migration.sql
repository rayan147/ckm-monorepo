/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwordHash",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "auth" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STAFF',

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
