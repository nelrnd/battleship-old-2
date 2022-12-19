import {
  createPlayers,
  setFirstTurn,
  setNextTurn,
  players,
  turn,
} from '../main.js';

test('Creating players', () => {
  createPlayers();
  expect(players.length).toBe(2);
  expect(players[0].type).toBe('human');
  expect(players[1].type).toBe('computer');
});

test('Setting first turn', () => {
  createPlayers();
  setFirstTurn();
  expect(turn.length).toBe(2);
  expect(turn[0].type).toBe('human');
  expect(turn[1].type).toBe('computer');
});

test('Setting next turn', () => {
  createPlayers();
  setFirstTurn();
  setNextTurn();
  expect(turn.length).toBe(2);
  expect(turn[0].type).toBe('computer');
  expect(turn[1].type).toBe('human');
});
