import { finalarrays } from './parser.js';

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
