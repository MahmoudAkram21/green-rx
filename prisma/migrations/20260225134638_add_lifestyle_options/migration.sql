-- CreateTable
CREATE TABLE "lifestyle_options" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lifestyle_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lifestyle_options_type_idx" ON "lifestyle_options"("type");

-- CreateIndex
CREATE INDEX "lifestyle_options_type_isActive_idx" ON "lifestyle_options"("type", "isActive");
