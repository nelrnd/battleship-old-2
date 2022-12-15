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

test('linSquares(), getting bottom square of a square', () => {
  const grid = new Grid();
  const square = grid.findSquare(5, 5);
  expect(square.top.y).toBe(4);
  expect(square.right.x).toBe(6);
  expect(square.bottom.y).toBe(6);
  expect(square.left.x).toBe(4);
});
