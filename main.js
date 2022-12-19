import { Computer, Human } from './classes/players';

const players = [];
const turn = [];

const createPlayers = () => {
  players.length = 0;
  players.push(new Human());
  players.push(new Computer());
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
