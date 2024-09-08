-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdenItems" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrdenItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenItems" ADD CONSTRAINT "OrdenItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenItems" ADD CONSTRAINT "OrdenItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
