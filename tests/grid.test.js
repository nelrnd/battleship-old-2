import { Grid } from '../classes/grid.js';

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
