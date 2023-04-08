import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';
import { parseDate } from './helpers.js';

const prisma = new PrismaClient();

export async function saveObjectsToDatabase(objects) {
  try {
    for (const object of objects) {

      object.ident = object.ident.substring(1);
      object.departure = parseDate(object.departure);
      object.estimatedArrivalTime = parseDate(object.estimatedArrivalTime);

      const { ident, type, origin, destination, departure, estimatedArrivalTime, estimatedTimeEnroute} = object;

      const existingObject = await prisma.borts.findUnique({ where: { ident } });

      if (existingObject) {
        await prisma.borts.update({
          where: { ident },
          data: {
            type,
            origin,
            destination,
            departure,
            estimatedArrivalTime,
            estimatedTimeEnroute,
          },
        });
      } else {
        await prisma.borts.create({
          data: {
            ident,
            type,
            origin,
            destination,
            departure,
            estimatedArrivalTime,
            estimatedTimeEnroute,
          },
        });
      }
    }

    console.log(chalk.red('Created records'));
  } catch (error) {
    console.error(chalk.red(`Error save database: ${error.message}`));
  } finally {
    await prisma.$disconnect();
  }
}