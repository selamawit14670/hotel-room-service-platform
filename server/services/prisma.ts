import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';

// Lazy-initialized singleton Prisma Client
let prismaClient: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prismaClient) {
    if (!config.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: config.DATABASE_URL,
        },
      },
    });
  }
  return prismaClient;
}

export const prisma = getPrisma();
