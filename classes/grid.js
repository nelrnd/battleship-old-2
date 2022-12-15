let gridSize = 10;

export class Grid {
  constructor(size) {
    this.grid = this.createGrid(size);
    this.placedShips = [];
  }

  createGrid(size = gridSize) {
    const grid = [];
    for (let i = 0; i < size * size; i++) {
      const square = [];
      square.x = i % size;
      square.y = Math.floor(i / size);
      grid.push(square);
    }
    return grid;
  }
}
