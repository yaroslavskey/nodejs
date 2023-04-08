import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
  
  export async function getDataByDateRange(origin, destination, startDate, endDate) {
    const data = await prisma.borts.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        origin: origin,
        destination: destination,
      },
      select: {
        ident: true,
        type: true,
        origin: true,
        destination: true,
        departure: true,
        estimatedArrivalTime: true,
        estimatedTimeEnroute: true,
        createdAt: true,
      },
    })
  
    const count = data.length;

    return {
      count,
      data,
    }
  }

  export async function getDataByDateRangeOrigin(origin, startDate, endDate) {
    const data = await prisma.borts.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        origin: origin,
      },
      select: {
        ident: true,
        type: true,
        origin: true,
        destination: true,
        departure: true,
        estimatedArrivalTime: true,
        estimatedTimeEnroute: true,
        createdAt: true,
      },
    })
  
    const count = data.length;

    return {
      count,
      data,
    }
  }

  export async function countOriginsByDateRange(startDate, endDate) {
    const data = await prisma.borts.groupBy({
      by: ['origin', 'destination', 'type'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        origin: true,
        destination: true,
        type: true,
      },
      orderBy: {
        _count: {
          origin: 'desc',
        },
      },
    })
  
    return data
  }

  

  
