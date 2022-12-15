import { Grid } from '../classes/grid.js';

test('Creating grid', () => {
  const grid = Grid();
  expect(grid.grid.length).toBe(100);
});

test('Creating 6x6 grid', () => {
  const grid = Grid(6);
  expect(grid.grid.length).toBe(36);
});
