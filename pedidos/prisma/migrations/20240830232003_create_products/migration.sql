-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_externalId_key" ON "products"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");
