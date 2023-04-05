import * as cheerio from 'cheerio';
import chalk from 'chalk';
import { getPageContent } from './helpers/puppeteer.js';
import { removeAircraftTypeWithKeywords } from './helpers/helpers.js';
import { parseBorts } from './helpers/parser.js';

import { getDataByDateRange, getDataByDateRangeOrigin, countOriginsByDateRange } from './helpers/reports.js';

(async () => {

  const origin = "Melbourne Orlando Intl (KMLB)";
  const destination = "Daytona Beach Intl (KDAB)";
  
  const startDate = new Date('2023-04-01T00:00:00.000Z')
  const endDate = new Date('2023-04-31T23:59:59.999Z')

  const result1 = await countOriginsByDateRange(startDate, endDate)

  //const result1 = await getDataByDateRangeOrigin(origin, startDate, endDate)

  //const result1 = await getDataByDateRange(origin, destination, startDate, endDate)
  console.log(result1)




  const selector = ['smallrow1', 'smallrow2'];
  const SITE = 'https://flightaware.com/live/aircrafttype';
  const url = `${SITE}`;
  const pageContent = await getPageContent(url);
  const $ = cheerio.load(pageContent);
  const items = [];

  for (let i = 0; i < selector.length; i++) {
    $(`tr.${selector[i]}`).each((_i, element) => {
      const count = $(element).find('td:first').text();
      const code = $(element).find('a').text();
      const aircraftType = $(element).find('td:last').text();
      items.push({
        count,
        code,
        aircraftType,
      });
    });
  }
  const subarray = await removeAircraftTypeWithKeywords(items);
  console.log(chalk.bgRed(`Load bort list !!! All records ${subarray.length}`));
  const result = await parseBorts(subarray);
})();


