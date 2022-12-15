let gridSize = 10;

export class Grid {
  constructor(size) {
    this.grid = this.createGrid(size);
    this.placedShips = [];
  }

  createGrid(size = gridSize) {
    const grid = [];
    for (let i = 0; i < size * size; i++) {
      const square = {};
      square.x = i % size;
      square.y = Math.floor(i / size);
      grid.push(square);
    }
    this.linkSquares(grid);
    return grid;
  }

  findSquare(x, y, grid = this.grid) {
    return grid.find((square) => square.x === x && square.y === y);
  }

  linkSquares(grid) {
    for (const square of grid) {
      const x = square.x;
      const y = square.y;
      square.top = this.findSquare(x, y - 1, grid);
      square.right = this.findSquare(x + 1, y, grid);
      square.bottom = this.findSquare(x, y + 1, grid);
      square.left = this.findSquare(x - 1, y, grid);
    }
  }
}
