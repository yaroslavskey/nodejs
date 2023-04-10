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

      const existingObject = await prisma.borts.findFirst({
        where: {
          ident,
          departure,
        },
      });
  
      // Если запись существует, выполняем обновление
      if (existingObject) {
        await prisma.borts.update({
          where: {
            id: existingObject.id,
          },
          data: {
            type,
            origin,
            destination,
            estimatedArrivalTime,
            estimatedTimeEnroute,
          },
        });
      } else {
        // Если запись не существует, выполняем создание
        await prisma.borts.create({
          data: {
            ident,
            departure,
            type,
            origin,
            destination,
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