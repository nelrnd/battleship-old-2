import { Grid } from './classes/grid.js';
import { Computer, Human } from './classes/players.js';
import { displayElem } from './dom.js';

const player1 = new Human('Joe');
const player2 = new Computer();

player1.placeShips();
player2.placeShips();
