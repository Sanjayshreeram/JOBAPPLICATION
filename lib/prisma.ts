import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Keep Alive function to ping DB every 4 minutes
function keepAlive() {
  setInterval(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`
      console.log('DB connection alive ping sent')
    } catch (err) {
      console.error('Failed keep-alive ping:', err)
    }
  }, 4 * 60 * 1000)
}

// Start keepAlive only once (in production or dev)
keepAlive()
