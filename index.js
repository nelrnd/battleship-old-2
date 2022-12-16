import { Grid } from './classes/grid.js';
import { Ship } from './classes/ship.js';
import { displayElem } from './dom.js';

const grid = new Grid();
displayElem(grid.elem);

const ship = new Ship(5);
grid.placeShip(ship, 2, 2, 'v');
grid.placeShip(new Ship(3), 7, 2);
grid.rotateShip(ship);
grid.placeShip(ship, 3, 5, 'v');

const button = document.createElement('button');
button.textContent = 'Rotate';
button.onclick = function () {
  grid.rotateShip(ship);
};

document.querySelector('main').appendChild(button);
