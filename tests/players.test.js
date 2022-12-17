import { Human } from '../classes/players.js';

test('Creating human', () => {
  const player = new Human('Joe');
  expect(player.type).toBe('human');
  expect(player.grid.grid.length).toBe(100);
});
