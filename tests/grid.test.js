import { Grid } from '../classes/grid.js';

test('Creating grid', () => {
  const grid = Grid(10);
  expect(grid.grid.length).toBe(100);
});
