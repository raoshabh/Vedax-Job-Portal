-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LedgerAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kind" TEXT NOT NULL,
    "ownerId" TEXT
);
INSERT INTO "new_LedgerAccount" ("id", "kind", "ownerId") SELECT "id", "kind", "ownerId" FROM "LedgerAccount";
DROP TABLE "LedgerAccount";
ALTER TABLE "new_LedgerAccount" RENAME TO "LedgerAccount";
CREATE UNIQUE INDEX "LedgerAccount_kind_ownerId_key" ON "LedgerAccount"("kind", "ownerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
