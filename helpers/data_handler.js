import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';
import { parseDate, addFieldToObject } from './helpers.js';

const prisma = new PrismaClient();

export async function saveObjectsToDatabase(objects) {
  try {
    for (const object of objects) {

      object.ident = object.ident.substring(1);
      object.departure = new Date(parseDate(object.departure));
      object.estimatedArrivalTime = new Date(parseDate(object.estimatedArrivalTime));
      const objectNew = addFieldToObject(object);

      const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000); // 10 минут в миллисекундах

      const { ident, type, origin, destination, departure, estimatedArrivalTime, estimatedTimeEnroute, superType} = objectNew;
      const existingObject = await prisma.bortsBase.findFirst({
        where: {
          ident: ident,
          departure: {
            gte: departure,
            lt: tenMinutesLater,
          },
        },
      });
  
      // Если запись существует, выполняем обновление
      if (existingObject) {
        await prisma.bortsBase.update({
          where: {
            id: existingObject.id,
          },
          data: {
            type,
            origin,
            destination,
            estimatedArrivalTime,
            estimatedTimeEnroute,
            superType,
          },
        });
      } else {
        // Если запись не существует, выполняем создание
        await prisma.bortsBase.create({
          data: {
            ident,
            type,
            origin,
            destination,
            departure,
            estimatedArrivalTime,
            estimatedTimeEnroute,
            superType,
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