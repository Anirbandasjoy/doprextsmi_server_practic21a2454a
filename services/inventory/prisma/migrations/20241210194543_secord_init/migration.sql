/*
  Warnings:

  - You are about to drop the column `lastQuality` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `newQuality` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `qualityChange` on the `History` table. All the data in the column will be lost.
  - Added the required column `lastQuantity` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newQuantity` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityChanged` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "lastQuality",
DROP COLUMN "newQuality",
DROP COLUMN "qualityChange",
ADD COLUMN     "lastQuantity" INTEGER NOT NULL,
ADD COLUMN     "newQuantity" INTEGER NOT NULL,
ADD COLUMN     "quantityChanged" INTEGER NOT NULL;
