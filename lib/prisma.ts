import { PrismaClient } from "@/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pgPool: Pool;
};

// Reuse the pool across hot reloads in dev to avoid connection leaks
const pool =
  globalForPrisma.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Allow the pool to reconnect automatically after dropped connections
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

const adapter = new PrismaPg(pool);

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
  globalForPrisma.prisma = prisma;
}

export default prisma;