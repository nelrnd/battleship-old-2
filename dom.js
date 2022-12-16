import { gridSize } from './classes/grid.js';

const page = document.querySelector('main');

const displayElem = (elem) => {
  page.appendChild(elem);
};

const createSquareElem = (ship) => {
  const squareElem = document.createElement('div');
  squareElem.className = ship ? 'square ship-square' : 'square';
  return squareElem;
};

const createGridElem = (grid) => {
  const gridElem = document.createElement('div');
  gridElem.className = 'grid';
  // populate grid with squares
  for (const square of grid) {
    const squareElem = createSquareElem();
    gridElem.appendChild(squareElem);
  }
  return gridElem;
};

const createShipElem = (ship) => {
  const shipElem = document.createElement('div');
  shipElem.className = 'ship';
  // populate ship with squares
  for (let i = 0; i < ship.length; i++) {
    const squareElem = createSquareElem(ship);
    shipElem.appendChild(squareElem);
  }
  // set ship elem direction
  const direction = ship.direction || 'h';
  shipElem.classList.add(direction === 'h' ? 'horizontal' : 'vertical');
  return shipElem;
};

const insertShipElem = (shipElem, gridElem) => {
  gridElem.appendChild(shipElem);
};

const positionShipElem = (shipElem, x, y) => {
  const grid = document.querySelector('.grid');
  const rect = grid.getBoundingClientRect();

  const posX = (rect.width / gridSize) * x;
  const posY = (rect.height / gridSize) * y;

  shipElem.style.left = posX + 'px';
  shipElem.style.top = posY + 'px';
};

export {
  displayElem,
  createSquareElem,
  createGridElem,
  createShipElem,
  insertShipElem,
  positionShipElem,
};
