import Dexie from 'dexie';

export const db = new Dexie('garageManagerDB');
db.version(1).stores({
  vehicles: '++id, year, make, model, trim, transmission, odometer, purprice, purdate, vin', // Primary key and indexed props
  todos: '++id, task, status, veh_id, category',
  partslist: '++id, veh_id, part, part_no, url, price_unit, quantity, vendor'
});