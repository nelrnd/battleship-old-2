import { Grid } from '../classes/grid.js';
import { Ship } from '../classes/ship.js';

test('Creating grid', () => {
  const grid = new Grid();
  expect(grid.grid.length).toBe(100);
});

test('Creating 6x6 grid', () => {
  const grid = new Grid(6);
  expect(grid.grid.length).toBe(36);
});

test('Find a square', () => {
  const grid = new Grid();
  const square = grid.findSquare(4, 6);
  expect(square.x).toBe(4);
  expect(square.y).toBe(6);
});

test('linkSquares(), linking squares between them', () => {
  const grid = new Grid();
  const square = grid.findSquare(5, 5);
  expect(square.top.y).toBe(4);
  expect(square.right.x).toBe(6);
  expect(square.bottom.y).toBe(6);
  expect(square.left.x).toBe(4);
});

test('Getting squares from coords', () => {
  const grid = new Grid();
  const squares = grid.getSquares(5, 4, 3, 'h');
  expect(squares.length).toBe(5);
  expect(squares.pop().x).toBe(8);
});

test('Checking squares validity', () => {
  const grid = new Grid();
  const squares = grid.getSquares(5, 4, 3, 'h');
  expect(grid.checkSquaresValidity(squares)).toBe(true);
});

test('Checking invalid squares', () => {
  const grid = new Grid();
  const squares = grid.getSquares(5, 7, 8, 'h');
  expect(grid.checkSquaresValidity(squares)).toBe(false);
});

test('Placing a ship', () => {
  const grid = new Grid();
  const ship = new Ship(4);
  grid.placeShip(ship, 3, 3, 'h');
  expect(ship.isPlaced).toBe(true);
  expect(grid.placedShips.length).toBe(1);
  expect(grid.findSquare(3, 3).ship).toBeTruthy();
  expect(grid.findSquare(6, 3).ship).toBeTruthy();
});

test('Removing a ship', () => {
  const grid = new Grid();
  const ship = new Ship(3);
  grid.placeShip(ship, 3, 3, 'h');
  grid.removeShip(ship);
  expect(ship.isPlaced).toBe(false);
  expect(grid.placedShips.length).toBe(0);
  expect(grid.findSquare(3, 3).ship).toBeUndefined();
  expect(grid.findSquare(6, 3).ship).toBeUndefined();
});

test('Moving a ship', () => {
  const grid = new Grid();
  const ship = new Ship(4);
  grid.placeShip(ship, 3, 3, 'h');
  grid.placeShip(ship, 5, 4, 'v');
  expect(grid.findSquare(5, 4).ship).toBeTruthy();
  expect(grid.findSquare(5, 7).ship).toBeTruthy();
});

test('Rotating a ship', () => {
  const grid = new Grid();
  const ship = new Ship(3);
  grid.placeShip(ship, 2, 2, 'h');
  grid.rotateShip(ship);
  expect(grid.findSquare(4, 2).ship).toBeUndefined();
  expect(grid.findSquare(2, 4).ship).toBeTruthy();
});

test('Populate grid randomy', () => {
  const grid = new Grid();
  grid.populate();
  expect(grid.placedShips.length).toBe(5);
});

test('Clearing a grid', () => {
  const grid = new Grid();
  const ship = new Ship(3);
  grid.populate();
  grid.placeShip(ship, 0, 0, 'v');
  grid.clear();
  expect(grid.placedShips.length).toBe(0);
  expect(ship.isPlaced).toBe(false);
});

test('Getting random valid coords', () => {
  const grid = new Grid();
  const ship = new Ship(3);
  grid.populate();
  const coords = grid.getRandomCoords(ship.length);
  const squares = grid.getSquares(
    ship.length,
    coords.x,
    coords.y,
    coords.direction
  );
  expect(grid.checkSquaresValidity(squares));
});

test('Attacking a grid', () => {
  const grid = new Grid();
  const ship = new Ship(3);
  grid.placeShip(ship, 2, 2, 'v');
  grid.receiveAttack(2, 2);
  grid.receiveAttack(2, 3);
  grid.receiveAttack(2, 4);
  expect(ship.isSunk).toBe(true);
  expect(grid.findSquare(2, 3).shot).toBe(true);
});

test('Checking if all ships are sunk', () => {
  const grid = new Grid();
  grid.placeShip(new Ship(1), 2, 2);
  grid.placeShip(new Ship(1), 4, 4);
  grid.placeShip(new Ship(1), 6, 6);
  expect(grid.allShipsAreSunk).toBe(false);
  grid.receiveAttack(2, 2);
  expect(grid.allShipsAreSunk).toBe(false);
  grid.receiveAttack(4, 4);
  grid.receiveAttack(6, 6);
  expect(grid.allShipsAreSunk).toBe(true);
});

test('Checking if all ships are placed', () => {
  const grid = new Grid();
  const ship1 = new Ship(3);
  const ship2 = new Ship(3);
  const ship3 = new Ship(3);
  const ship4 = new Ship(3);
  const ship5 = new Ship(3);
  expect(grid.allShipsArePlaced).toBe(false);
  grid.placeShip(ship1, 0, 0, 'v');
  grid.placeShip(ship2, 2, 0, 'v');
  grid.placeShip(ship3, 4, 0, 'v');
  grid.placeShip(ship4, 6, 0, 'v');
  grid.placeShip(ship5, 7, 0, 'v');
  expect(grid.allShipsArePlaced).toBe(true);
});
