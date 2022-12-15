const createSquareElem = (ship) => {
  const squareElem = document.createElement('div');
  squareElem.className = ship ? 'ship-square' : 'square';
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
  shipElem.classList.add(ship.direction);
  return shipElem;
};

export { createSquareElem, createGridElem, createShipElem };
