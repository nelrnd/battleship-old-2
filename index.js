import { Grid } from './classes/grid.js';
import { Ship } from './classes/ship.js';
import {
  displayElem,
  createGridElem,
  createShipElem,
  insertShipElem,
  positionShipElem,
} from './dom.js';

const grid = new Grid();
const gridElem = createGridElem(grid.grid);

const ship = new Ship(4);

grid.placeShip(ship, 3, 3, 'v');

const shipElem = createShipElem(ship);

displayElem(gridElem);
displayElem(shipElem);
insertShipElem(shipElem, gridElem);
positionShipElem(shipElem, 3, 6);
