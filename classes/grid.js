let gridSize = 10;

const Grid = (size = gridSize) => {
  const grid = [];
  const placedShips = [];

  // populate grid with squares
  for (let i = 0; i < size * size; i++) {
    const square = {};
    square.x = i % size;
    square.y = Math.floor(i / size);
    grid.push(square);
  }

  return { grid };
};

export { Grid };
