import { Grid } from '../classes/grid.js';

test('Creating grid', () => {
  const grid = new Grid();
  expect(grid.grid.length).toBe(100);
});

test('Creating 6x6 grid', () => {
  const grid = new Grid(6);
  expect(grid.grid.length).toBe(36);
});
