-- CreateTable
CREATE TABLE "Tricount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "total" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Cost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "tricountId" INTEGER NOT NULL,
    "payerId" INTEGER NOT NULL,
    CONSTRAINT "Cost_tricountId_fkey" FOREIGN KEY ("tricountId") REFERENCES "Tricount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cost_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Debtors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_Debtors_A_fkey" FOREIGN KEY ("A") REFERENCES "Cost" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Debtors_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Debtors_AB_unique" ON "_Debtors"("A", "B");

-- CreateIndex
CREATE INDEX "_Debtors_B_index" ON "_Debtors"("B");
