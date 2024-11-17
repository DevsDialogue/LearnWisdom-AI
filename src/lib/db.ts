import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }
  prisma = global.cachedPrisma;
}

// Handle connection errors
prisma.$connect().catch((e) => {
  console.error("Failed to connect to database:", e);
});

export { prisma };
