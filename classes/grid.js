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

  getSquares(length, x, y, direction) {
    const squares = [];
    let square = this.findSquare(x, y);
    for (let i = 0; i < length; i++) {
      if (square) {
        squares.push(square);
        square = direction === 'h' ? square.right : square.bottom;
      } else {
        squares.push(undefined);
      }
    }
    return squares;
  }

  checkSquaresValidity(squares, ship) {
    if (ship) {
      const cb = (square) => square && (!square.ship || square.ship === ship);
      return squares.every(cb);
    } else {
      const cb = (square) => square && !square.ship;
      return squares.every(cb);
    }
  }

  placeShip(ship, x, y, direction) {
    const squares = this.getSquares(ship.length, x, y, direction);
    if (this.checkSquaresValidity(squares, ship) === true) {
      if (ship.isPlaced) {
        this.removeShip(ship);
      }
      for (const square of squares) {
        square.ship = ship;
      }
      ship.x = x;
      ship.y = y;
      ship.direction = direction;
      this.placedShips.push(ship);
    }
  }

  removeShip(ship) {
    const squares = this.getSquares(
      ship.length,
      ship.x,
      ship.y,
      ship.direction
    );
    for (const square of squares) {
      square.ship = undefined;
    }
    ship.x = undefined;
    ship.y = undefined;
    ship.direction = undefined;
    let shipIndex = this.placedShips.findIndex((s) => s === ship);
    this.placedShips.splice(shipIndex, 1);
  }
}
