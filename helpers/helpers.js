import { finalarrays } from './parser.js';
import moment from 'moment';

export function removeAircraftTypeWithKeywords(array) {
  return array.filter((obj) => {
    const { aircraftType } = obj;
    if (typeof aircraftType !== 'string') {
      return true;
    }
    const keywords = ['Airbus', 'Boeing', 'BOEING'];
    for (let i = 0; i < keywords.length; i++) {
      if (aircraftType.includes(keywords[i])) {
        return false;
      }
    }
    return true;
  }).map(({ count, code }) => ({ count, code }));
}

export function copyArrayObjects(array) {
  const subarrays = [];
  const subarraySize = 7;

  for (let i = 0; i < array.length; i += subarraySize) {
    subarrays.push(array.slice(i, i + subarraySize));
  }

  for (let i = 0; i < subarrays.length; i++) {
    
    const obj = {};
    obj.ident = subarrays[i][0].origin;
    obj.type = subarrays[i][1].origin;
    obj.origin = subarrays[i][2].origin;
    obj.destination = subarrays[i][3].origin;
    obj.departure = subarrays[i][4].origin;
    obj.estimatedArrivalTime = subarrays[i][5].origin;
    obj.estimatedTimeEnroute = subarrays[i][6].origin;
    finalarrays.push(obj);
  }
  
  return finalarrays;
}

export function filterObjects(arr) {
  return arr.filter(obj => obj.destination !== '');
}

export function parseDate(dateString) {
  const parsedDate = moment(dateString, 'ddd hh:mmA z');
  return parsedDate.format('YYYY-MM-DD HH:mm:ss.SSZZ');
};

export function filterObjectsByCode(objects, arr) {
    const filteredObjects = [];

    objects.forEach(obj => {
      if (arr.includes(obj.code)) {
        filteredObjects.push(obj);
      }
    });
  
    return filteredObjects;
  }

export const arr = [
  'C525',
  'C525',
  'C525',
  'C500',
  'C500',
  'C501',
  'C25M',
  'C510',
  'C500',
  'EA50',
  'EA50',
  'HDJT',
  'HDJT',
  'E50P',
  'E50P',
  'SF50',
  'AT75',
  'AT72',
  'CL60',
  'CL60',
  'CL60',
  'CL60',
  'CL60',
  'CL60',
  'CL60',
  'CL60',
  'CL60',
  'CRJ2',
  'CRJ2',
  'CL60',
  'CRJ2',
  'CL60',
  'F2TH',
  'F2TH',
  'F2TH',
  'F2TH',
  'F2TH',
  'FTH',
  'F2TH',
  'F2TH',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'F900',
  'GLF4',
  'GLF4',
  'GLF4',
  'GLF4',
  'GLF4',
  'GLF4',
  'GLF2',
  'GLF2',
  'GLF2',
  'GLF2',
  'GLF2',
  'GLF3',
  'L29A',
  'L29B',
  'L29B',
  'L188',
  'E35L',
  'E35L',
  'E35L',
  'L29A',
  'BE40',
  'BE40',
  'C550',
  'C25C',
  'C25A',
  'C25A',
  'C25B',
  'C25B',
  'C25C',
  'C25C',
  'C560',
  'C560',
  'C550',
  'C550',
  'C550',
  'C560',
  'C560',
  'S601',
  'S601',
  'MU30',
  'BE40',
  'BE40',
  'HF20',
  'JCOM',
  'LJ23',
  'LJ24',
  'LJ24',
  'LJ24',
  'LJ24',
  'LJ24',
  'LJ24',
  'LJ24',
  'LJ25',
  'LJ25',
  'LJ25',
  'LJ25',
  'LJ28',
  'LJ31',
  'LJ31',
  'LJ31',
  'LJ35',
  'BE40',
  'BE40',
  'P180',
  'P180',
  'P180',
  'PRM1',
  'PRM1',
  'SJ30',
  'JCOM',
  'C650',
  'FA20',
  'ASTR',
  'G150',
  'H25A',
  'H25B',
  'H25A',
  'H25B',
  'H25A',
  'H25B',
  'ASTR',
  'ASTR',
  'ASTR',
  'C130',
  'LJ55',
  'LJ55',
  'LJ55',
  'LJ55',
  'LJ60',
  'LJ60',
  'NOMA',
  'SBR1',
  'SBR2',
  'SBR2',
  'ASTR',
  'ASTR',
  'WW24',
  'WW23',
  'WW24',
  'YK40',
  'C56X',
  'FA10',
  'FA10',
  'LJ40',
  'LJ40',
  'LJ45',
  'LJ45',
  'LJ70',
  'LJ75',
  'E55P',
  'E55P',
  'PC24',
  'SBR1',
  'SBR1',
  'CL30',
  'CL35',
  'CL35',
  'C68A',
  'C700',
  'C680',
  'C680',
  'C750',
  'C750',
  'J328',
  'FA20',
  'FA50',
  'FA50',
  'FA50',
  'GALX',
  'G280',
  'G250',
  'H25C',
  'H25C',
  'HA4T',
  'GALX',
  'E545',
  'E550',
  'E545',
  'E545',
  'FA7X',
  'D8X',
  'FA7X',
  'GL5T',
  'GL5T',
  'GLEX',
  'GLEX',
  'GLEX',
  'GLEX',
  'GLEX',
  'GLF6',
  'GLF5',
  'GLF5',
  'GLF5',
  'GLF6',
  'GLF6',
  'GLF5',
  'GLF2'
];
