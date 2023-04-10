import * as cheerio from 'cheerio';
import chalk from 'chalk';
import { getPageContent } from './puppeteer.js';
import { copyArrayObjects, filterObjects, delay } from './helpers.js';
import { saveObjectsToDatabase } from './data_handler.js';

export const finalarrays = [];

export async function parseBorts(bort) {
  const selector = ['smallrow1', 'smallrow2'];
  try {
      for (let i = 0; i < bort.length; i++) {
        const b = bort[i].code;
        const a = parseInt(bort[i].count);

        console.log(chalk.green(`Bort name, ${bort[i].code}`));
        console.log(chalk.green(`Number of records, ${bort[i].count}`));

        for (let i = 0; i <= a + 20; i += 20) {
          console.log(chalk.italic(`Processed ${i} entries out of ${a}`));

          const SITE = `https://flightaware.com/live/aircrafttype/${b}?locale=en_US;offset=${i};order=actualdeparturetime;sort=DESC`;
          const url = `${SITE}`;
          const pageContent = await getPageContent(url);
          const $ = cheerio.load(pageContent);
          const items = [];

          for (let i = 0; i < selector.length; i++) {
            $(`td.${selector[i]}`).each((i, element) => {
              const origin = $(element).text();
              items.push({
                origin,
              });
            });
          }
          const obj = copyArrayObjects(items);
          await delay(2000);
        }
          const subarraySort = filterObjects(finalarrays);

        if (subarraySort.length === 0) {
          console.log(chalk.red('Array is empty'), subarraySort.length);
        } else {
          console.log(chalk.blue('Size array', subarraySort.length));
          await saveObjectsToDatabase(subarraySort);
        }
        finalarrays.splice(0, finalarrays.length);
      }
  } catch (err) {
    console.log('An error has occurred');
    console.log(err);
  }
}
