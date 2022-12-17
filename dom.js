const page = document.querySelector('main');

const displayElem = (elem) => {
  page.appendChild(elem);
};

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
  const posX = (gridWidth / gridSize) * x;
  const posY = (gridHeight / gridSize) * y;

  shipElem.style.left = posX + 'px';
  shipElem.style.top = posY + 'px';
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

export {
  displayElem,
  createSquareElem,
  createGridElem,
  createShipElem,
  insertShipElem,
  positionShipElem,
  rotateShipElem,
  getGridCoords,
  checkIfPointerOnGrid,
  checkIfNewGridCoords,
};
