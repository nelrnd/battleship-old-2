import { Computer, Human } from './classes/players.js';
import {
  displayGameboard,
  displayPlaceShips,
  makeShipMoveable,
  makeShipUnmoveable,
} from './dom.js';

const players = [];
const turn = [];

const createPlayers = () => {
  players.length = 0;
  players.push(new Human());
  players.push(new Computer());
};

const setShips = () => {
  players.forEach((player) => {
    player.placeShips();
  });

  displayPlaceShips(players[0].grid);
};

const setFirstTurn = () => {
  turn.length = 0;
  turn.push(players[0]);
  turn.push(players[1]);
};

const setNextTurn = () => {
  const first = turn.shift();
  turn.push(first);
};

const playTurn = (player) => {
  if (player.type === 'human') {
    // make computer grid playable
  } else if (player.type === 'computer') {
    // make computer grid unplayable
    player.playTurn();
  }
};

const startGame = () => {
  // Display player grids
  displayGameboard(players[0].grid, players[1].grid);
  // Make player's ships not moveable anymore
  for (const ship of players[0].grid.placedShips) {
    makeShipUnmoveable(ship);
  }
  // Set player 1 as first turn
  setFirstTurn();

  // game loop
  while (players[0].grid.allShipsAreSunk) {
    playTurn(players[0]);
  }
};

export {
  createPlayers,
  setShips,
  setFirstTurn,
  setNextTurn,
  startGame,
  players,
  turn,
};
