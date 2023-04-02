import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import chalk from 'chalk';

const prisma = new PrismaClient();

export async function writeToDatabase(data) {
  try {
    const currentDate = new Date();
    const date = currentDate.toLocaleString().replace(/:/g, '-');

    for (let i = 0; i < data.length; i++) {
      const {
        ident, type, origin, destination, departure, estimatedArrivalTime, estimatedTimeEnroute,
      } = data[i];
      await prisma.borts.create({
        data: {
          date,
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
    console.log(chalk.red('Created records'));
  } catch (err) {
    console.error(err);
  }
  finally {
    await prisma.$disconnect();
  }
}

export async function sortByMatchCount() {
  const result = await prisma.Borts.findMany({
    // orderBy: {
    //   _count: {
    //     origin: 'desc',
    //     destination: 'desc',
    //   },
    // },
    select: {
      origin: true,
      destination: true,
      _count: {
        select: {
          origin: true,
          destination: true,
        },
      },
    },
    groupBy: {
      origin: true,
      destination: true,
    },
  })
  console.log(result)
  return result
}

export async function createManyRecords(data) {
  try {
    const createdRecords = await prisma.borts.createMany({
      data,
    });
    console.log(`Created ${createdRecords.count} records`);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function saveArrayToJsonFile(array) {
  try {
    const jsonString = JSON.stringify(array);

    const currentDate = new Date();
    const dateTimeString = currentDate.toLocaleString().replace(/:/g, '-');

    const fileName = `${array[0].type}_${dateTimeString}.json`;
    fs.writeFile(`./data/${fileName}`, jsonString, (err) => {
      if (err) { console.log(err); } else {
        console.log(`File written successfully ${fileName}\n`);
      }
    });
  } catch (err) {
    console.log('Error save file: ', err);
  }
}
