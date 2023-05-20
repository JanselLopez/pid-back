/*
  Warnings:

  - Added the required column `importance` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "place" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mdContent" TEXT NOT NULL,
    "importance" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("endDate", "id", "mdContent", "ownerId", "place", "title") SELECT "endDate", "id", "mdContent", "ownerId", "place", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
