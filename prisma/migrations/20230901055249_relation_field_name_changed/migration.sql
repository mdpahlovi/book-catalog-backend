/*
  Warnings:

  - You are about to drop the `orderedbooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderedbooks" DROP CONSTRAINT "orderedbooks_bookId_fkey";

-- DropForeignKey
ALTER TABLE "orderedbooks" DROP CONSTRAINT "orderedbooks_orderId_fkey";

-- DropTable
DROP TABLE "orderedbooks";

-- CreateTable
CREATE TABLE "orderedBooks" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "orderedBooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderedBooks" ADD CONSTRAINT "orderedBooks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderedBooks" ADD CONSTRAINT "orderedBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
