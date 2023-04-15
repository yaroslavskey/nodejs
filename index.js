import * as cheerio from 'cheerio';
import chalk from 'chalk';
import { getPageContent } from './helpers/puppeteer.js';
import { removeAircraftTypeWithKeywords, filterObjectsByCode, arr } from './helpers/helpers.js';
import { parseBorts } from './helpers/parser.js';

(async () => {
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

  const filterObjectsArr = await filterObjectsByCode(subarray, arr);
  //console.log(filterObjectsArr)

  console.log(chalk.bgRed(`Load bort list !!! All records ${subarray.length}`));
  const result = await parseBorts(filterObjectsArr);
})();


