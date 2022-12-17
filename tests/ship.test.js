import { Grid } from '../classes/grid.js';
import { Ship } from '../classes/ship.js';

test('Creating a ship', () => {
  const ship = new Ship(3, 'Cruiser');
  expect(ship.length).toBe(3);
  expect(ship.name).toBe('Cruiser');
});

test('Sunking a ship', () => {
  const ship = new Ship(3);
  expect(ship.isSunk).toBe(false);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk).toBe(true);
});

test('Checking if ship is placed', () => {
  const ship = new Ship(3);
  expect(ship.isPlaced).toBe(false);
  ship.x = 3;
  ship.y = 4;
  ship.direction = 'h';
  expect(ship.isPlaced).toBe(true);
});

test('Checking if ship is placed 2', () => {
  const grid = new Grid();
  const ship = new Ship(3);
  grid.placeShip(ship, 0, 0, 'h');
  expect(ship.isPlaced).toBe(true);
});
