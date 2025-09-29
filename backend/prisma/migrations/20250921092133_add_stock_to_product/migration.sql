-- AlterEnum
ALTER TYPE "public"."OrderStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "total" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "attributes" JSONB,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."File" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);
