/*
  Warnings:

  - The primary key for the `Contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[mail]` on the table `Contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_pkey",
ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY ("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_mail_key" ON "Contacts"("mail");
