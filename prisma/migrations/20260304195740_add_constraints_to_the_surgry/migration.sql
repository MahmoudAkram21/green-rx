/*
  Warnings:

  - A unique constraint covering the columns `[patientId,operationId]` on the table `surgical_histories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "surgical_histories_patientId_operationId_key" ON "surgical_histories"("patientId", "operationId");
