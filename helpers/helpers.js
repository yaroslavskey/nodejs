import { finalarrays } from './parser.js';
import moment from 'moment';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const arr = [
  'C525', 'C500', 'C501', 'C25M', 'C510', 'EA50', 'HDJT', 'E50P', 'SF50', 'CL60',
  'CRJ2', 'F2TH', 'FTH', 'F900', 'GLF4', 'GLF2', 'GLF3', 'L29A', 'L29B', 'L188',
  'E35L', 'BE40', 'C550', 'C25C', 'C25A', 'C25B', 'C560', 'S601', 'MU30', 'HF20',
  'JCOM', 'LJ23', 'LJ24', 'LJ25', 'LJ28', 'LJ31', 'LJ35', 'P180', 'PRM1', 'SJ30',
  'C650', 'FA20', 'ASTR', 'G150', 'H25A', 'H25B', 'C130', 'LJ55', 'LJ60', 'NOMA',
  'SBR1', 'SBR2', 'WW24', 'WW23', 'C56X', 'FA10', 'LJ40', 'LJ45', 'LJ70', 'LJ75',
  'E55P', 'PC24', 'CL30', 'CL35', 'C68A', 'C700', 'C680', 'C750', 'J328', 'FA50',
  'GALX', 'G280', 'G250', 'H25C', 'HA4T', 'E545', 'E550', 'FA7X', 'D-8X', 'GL5T',
  'GLEX', 'GLF6', 'GLF5'
];

export function addFieldToObject(obj) {

  const arrays = [
    ['Entry level jet (VLJ)',	'Citation Jet/CJ1', 'C525'],
    ['Entry level jet (VLJ)',	'Citation I',	'C500'],
    ['Entry level jet (VLJ)',	'Citation I',	'C501'],
    ['Entry level jet (VLJ)',	'Citation M2', 'C25M'],
    ['Entry level jet (VLJ)',	'Citation Mustang',	'C510'],
    ['Entry level jet (VLJ)',	'Eclipse 500',	'EA50'],
    ['Entry level jet (VLJ)',	'HondaJet',	'HDJT'],
    ['Entry level jet (VLJ)',	'Phenom 100',	'E50P'],
    ['Entry level jet (VLJ)',	'Cirrus SF50',	'SF50'],
    ['Heavy jet',	'Challenger 600/601',	'CL60'],
    ['Heavy jet',	'Challenger 800',	'CRJ2'],
    ['Heavy jet',	'Falcon 2000',	'F2TH'],
    ['Heavy jet',	'Falcon 2000',	'FTH'],
    ['Heavy jet',	'Falcon 900',	'F900'],
    ['Heavy jet', 'Gulfstream G400',	'GLF4'],
    ['Heavy jet',	'Gulfstream II',	'GLF2'],
    ['Heavy jet',	'Gulfstream III',	'GLF3'],
    ['Heavy jet',	'Lockheed Jetstar',	'L29A'],
    ['Heavy jet',	'Lockheed Jetstar',	'L29B'],
    ['Heavy jet',	'Lockheed L-188',	'L188'],
    ['Heavy jet',	'Legacy 600/650',	'E35L'],
    ['Light jet',	'Hawker/Beechjet 400',	'BE40'],
    ['Light jet',	'Citation II',	'C550'],
    ['Light jet',	'Citation CJ4',	'C25C'],
    ['Light jet',	'Citation CJ2',	'C25A'],
    ['Light jet',	'Citation CJ3',	'C25B'],
    ['Light jet',	'Citation V',	'C560'],
    ['Light jet',	'Aerospatiale Corvette', 'S601'],
    ['Light jet',	'Mitsubishi Diamond',	'MU30'],
    ['Light jet',	'Hansa 320', 'HF20'],
    ['Light jet',	'Jet Commander', 'JCOM'],
    ['Light jet',	'Learjet 23',	'LJ23'],
    ['Light jet',	'Learjet 24',	'LJ24'],
    ['Light jet',	'Learjet 25',	'LJ25'],
    ['Light jet',	'Learjet 28',	'LJ28'],
    ['Light jet',	'Learjet 31',	'LJ31'],
    ['Light jet',	'Learjet 35',	'LJ35'],
    ['Light jet',	'Piaggio Avanti',	'P180'],
    ['Light jet',	'Premier 1',	'PRM1'],
    ['Light jet',	'Swearingen SJ-30',	'SJ30'],
    ['Midsize jet',	'Citation VII',	'C650'],
    ['Midsize jet',	'Falcon 20',	'FA20'],
    ['Midsize jet', 'Gulfstream G100',	'ASTR'],
    ['Midsize jet',	'Gulfstream G150', 'G150'],
    ['Midsize jet',	'Hawker Series 1 - 3',	'H25A'],
    ['Midsize jet',	'Hawker 800',	'H25B'],
    ['Midsize jet',	'Lockheed C-130',	'C130'],
    ['Midsize jet',	'Learjet 55',	'LJ55'],
    ['Midsize jet',	'Learjet 60',	'LJ60'],
    ['Midsize jet',	'GAF Nomad',	'NOMA'],
    ['Midsize jet',	'Sabreliner',	'SBR1'],
    ['Midsize jet',	'Sabreliner 75/80',	'SBR2'],
    ['Midsize jet',	'Westwind',	'WW24'],
    ['Midsize jet',	'Westwind',	'WW23'],
    ['Super light jet',	'Citation Excel/XLS',	'C56X'],
    ['Super light jet',	'Falcon 10',	'FA10'],
    ['Super light jet', 'Learjet 40',	'LJ40'],
    ['Super light jet',	'Learjet 45',	'LJ45'],
    ['Super light jet',	'Learjet 70',	'LJ70'],
    ['Super light jet',	'Learjet 75',	'LJ75'],
    ['Super light jet',	'Phenom 300',	'E55P'],
    ['Super light jet',	'Pilatus PC-24',	'PC24'],
    ['Super midsize jet',	'Challenger 300', 'CL30'],
    ['Super midsize jet',	'Challenger 350', 'CL35'],
    ['Super midsize jet',	'Citation Latitude', 'C68A'],
    ['Super midsize jet',	'Citation Longitude',	'C700'],
    ['Super midsize jet',	'Citation Sovereign',	'C680'],
    ['Super midsize jet',	'Citation X',	'C750'],
    ['Super midsize jet',	'Dornier 328 Executive Jet', 'J328'],
    ['Super midsize jet',	'Falcon 50,',	'FA50'],
    ['Super midsize jet',	'Gulfstream G200', 'GALX'],
    ['Super midsize jet',	'Gulfstream G280', 'G280'],
    ['Super midsize jet',	'Gulfstream G250', 'G250'],
    ['Super midsize jet',	'Hawker 1000', 'H25C'],
    ['Super midsize jet',	'Hawker 4000', 'HA4T'],
    ['Super midsize jet',	'Legacy 450',	'E545'],
    ['Super midsize jet',	'Legacy 500',	'E550'],
    ['Ultra long range',	'Falcon 7X',	'FA7X'],
    ['Ultra long range', 'Falcon 7X',	'D-8X'],
    ['Ultra long range', 'Global 5000',	'GL5T'],
    ['Ultra long range', 'Global Express/XRS', 'GLEX'],
    ['Ultra long range', 'Gulfstream G650',	'GLF6'],
    ['Ultra long range', 'Gulfstream G500', 'GLF5']
  ]

  for (let i = 0; i < arrays.length; i++) {
    if (obj.type == arrays[i][2]) {
      obj.superType = arrays[i][0];
    }
  }
  return obj;
}

