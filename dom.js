import { players, startGame } from './main.js';

const page = document.querySelector('main');

const displayElem = (elem) => {
  page.appendChild(elem);
};

const displayGrid = (grid) => {
  page.appendChild(grid.elem);
  grid.placedShips.forEach((ship) => {
    positionShipElem(ship.elem, ship.x, ship.y, grid.elem, grid.size);
  });
};

const clearPage = () => (page.innerHTML = null);

const createSquareElem = (ship) => {
  const squareElem = document.createElement('div');
  squareElem.className = ship ? 'square ship-square' : 'square';
  return squareElem;
};

const createGridElem = (grid, size) => {
  const gridElem = document.createElement('div');
  gridElem.className = 'grid';

  // if grid size is different than default
  if (size !== 10) {
    // adjust the grid elem size
    gridElem.style.setProperty('--grid-length', size);
    gridElem.style.setProperty(
      '--square-size',
      'calc(var(--grid-size) / var(--grid-length))'
    );
  }

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

const positionShipElem = (shipElem, x, y, gridElem, gridSize) => {
  const gridWidth = gridElem.offsetWidth;
  const gridHeight = gridElem.offsetHeight;
  const posX = ((gridWidth / gridSize) * x * 100) / gridWidth;
  const posY = ((gridHeight / gridSize) * y * 100) / gridHeight;

  shipElem.style.left = posX + '%';
  shipElem.style.top = posY + '%';
};

const rotateShipElem = (shipElem, direction) => {
  shipElem.classList.remove('horizontal');
  shipElem.classList.remove('vertical');
  shipElem.classList.add(direction === 'h' ? 'horizontal' : 'vertical');
};

const gridCoords = { previousX: null, previousY: null, newX: null, newY: null };

const getGridCoords = (event, elem, size) => {
  gridCoords.previousX = gridCoords.newX;
  gridCoords.previousY = gridCoords.newY;
  const leftDist = event.clientX - elem.offsetLeft;
  const topDist = event.clientY - elem.offsetTop;
  const x = Math.floor((leftDist * size) / elem.offsetWidth);
  const y = Math.floor((topDist * size) / elem.offsetHeight);
  gridCoords.newX = x;
  gridCoords.newY = y;
  return [x, y];
};

const checkIfPointerOnGrid = (event, elem) => {
  return (
    event.clientX > elem.offsetLeft &&
    event.clientX < elem.offsetWidth + elem.offsetLeft &&
    event.clientY > elem.offsetTop &&
    event.clientY < elem.offsetHeight + elem.offsetTop
  );
};

const checkIfNewGridCoords = () => {
  if (
    gridCoords.previousX !== gridCoords.newX ||
    gridCoords.previousY !== gridCoords.newY
  ) {
    return true;
  } else {
    return false;
  }
};

const makeShipMoveable = (ship) => {
  ship.elem.addEventListener('mousedown', dragStart);
};

const makeShipUnmoveable = (ship) => {
  ship.elem.removeEventListener('mousedown', dragStart);
};

// Dragging and rotating ship elems

let hasMoved = false;
let squareIndex = 0;

// current ship and grid
let ship = null;
let grid = null;

const dragStart = (event) => {
  ship = getShip(event);
  grid = getGrid(event);

  ship.elem.classList.add('active');
  squareIndex = getSquareIndex(event, ship);

  document.addEventListener('mousemove', dragShip);
  document.addEventListener('mouseup', rotateShip);
  document.addEventListener('mouseup', dragEnd);
};

const dragShip = (event) => {
  if (checkIfPointerOnGrid(event, grid.elem)) {
    let [x, y] = getGridCoords(event, grid.elem, grid.size);
    ship.direction === 'h' ? (x -= squareIndex) : (y -= squareIndex);
    if (checkIfNewGridCoords()) {
      grid.placeShip(ship, x, y, ship.direction);
    }
  }

  hasMoved = true;
};

const rotateShip = () => {
  if (hasMoved === false) grid.rotateShip(ship);
  document.removeEventListener('mouseup', rotateShip);
  hasMoved = false;
};

const dragEnd = () => {
  ship.elem.classList.remove('active');
  document.removeEventListener('mousemove', dragShip);
  document.removeEventListener('mouseup', dragEnd);
  ship = null;
  grid = null;
};

const getShip = (event) => {
  const shipElem = event.target.parentNode;
  const grid = getGrid(event);
  return grid.placedShips.find((ship) => ship.elem === shipElem);
};

const getGrid = (event) => {
  const gridElem = event.target.parentNode.parentNode;
  return players.find((player) => player.grid.elem === gridElem).grid;
};

const getSquareIndex = (event, ship) => {
  const rect = ship.elem.getBoundingClientRect();
  if (ship.direction === 'h') {
    const leftDist = event.clientX - rect.left;
    const fromSquare = Math.floor((leftDist * ship.length) / rect.width);
    return fromSquare;
  } else if (ship.direction === 'v') {
    const topDist = event.clientY - rect.top;
    const fromSquare = Math.floor((topDist * ship.length) / rect.height);
    return fromSquare;
  }
};

const displayPlaceShips = (grid) => {
  clearPage();
  displayGrid(grid);

  for (const ship of grid.placedShips) {
    makeShipMoveable(ship);
  }

  const randomizeBtn = document.createElement('button');
  randomizeBtn.onclick = () => grid.populate();
  randomizeBtn.className = 'btn';
  randomizeBtn.textContent = 'Randomize';

  const startBtn = document.createElement('button');
  startBtn.onclick = () => startGame();
  startBtn.className = 'btn';
  startBtn.textContent = 'Start game';

  const buttons = document.createElement('div');
  buttons.className = 'btns';
  buttons.appendChild(randomizeBtn);
  buttons.appendChild(startBtn);

  displayElem(buttons);
};

const displayGameboard = (grid1, grid2) => {
  clearPage();
  displayGrid(grid1);
  displayGrid(grid2);
};

const makeGridPlayable = (grid) => {
  
}

export {
  displayElem,
  displayGrid,
  clearPage,
  createSquareElem,
  createGridElem,
  createShipElem,
  insertShipElem,
  positionShipElem,
  rotateShipElem,
  makeShipMoveable,
  makeShipUnmoveable,
  displayPlaceShips,
  displayGameboard,
};
