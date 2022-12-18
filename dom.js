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

const makeShipMoveable = (ship, grid) => {
  let hasMoved = false;
  let squareIndex = 0;

  const dragStart = (event) => {
    ship.elem.classList.add('active');
    squareIndex = getSquareIndex(event, ship);

    document.addEventListener('mousemove', dragShip);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mouseup', rotateShip);
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
    if (!hasMoved) grid.rotateShip(ship);
    document.removeEventListener('mouseup', rotateShip);
    hasMoved = false;
  };

  const dragEnd = () => {
    ship.elem.classList.remove('active');
    document.removeEventListener('mousemove', dragShip);
  };

  ship.elem.addEventListener('mousedown', dragStart);
};

const makeShipUnmoveable = (ship) => {
  ship.elem.removeEventListener('mousedown', dragStart);
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
};
