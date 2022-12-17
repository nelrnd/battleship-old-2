import { Grid } from './classes/grid.js';
import { Ship } from './classes/ship.js';
import { displayElem } from './dom.js';

const grid = new Grid();
displayElem(grid.elem);

/*
const ship = new Ship(5);
grid.placeShip(ship, 2, 2, 'v');
grid.placeShip(new Ship(3), 7, 2);
grid.rotateShip(ship);
grid.placeShip(ship, 3, 5, 'v');
*/

const rotateBtn = document.createElement('button');
rotateBtn.textContent = 'Rotate';
rotateBtn.onclick = function () {
  grid.rotateShip(ship);
};

const populateBtn = document.createElement('button');
populateBtn.textContent = 'Random';
populateBtn.onclick = function () {
  grid.populate();
};

const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear';
clearBtn.onclick = function () {
  grid.clear();
};

document.querySelector('main').appendChild(populateBtn);
document.querySelector('main').appendChild(rotateBtn);
document.querySelector('main').appendChild(clearBtn);
