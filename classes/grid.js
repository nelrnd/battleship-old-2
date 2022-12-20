import {
  createGridElem,
  insertShipElem,
  makeShipMoveable,
  positionShipElem,
} from '../dom.js';
import { getRandomCoord, getRandomBool } from '../utils.js';
import { fleet, Ship } from './ship.js';

export class Grid {
  constructor(size) {
    this.grid = this.create(size);
    this.placedShips = [];
    this.elem = createGridElem(this.grid, this.size);
  }

  create(size = 10) {
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

  clear() {
    for (let i = this.placedShips.length - 1; i >= 0; i--) {
      this.removeShip(this.placedShips[i]);
    }
  }

  get size() {
    return Math.sqrt(this.grid.length);
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

  placeShip(ship, x, y, direction = 'h') {
    const squares = this.getSquares(ship.length, x, y, direction);
    if (this.checkSquaresValidity(squares, ship) === true) {
      if (ship.isPlaced) {
        this.removeShip(ship);
      }
      for (const square of squares) {
        square.ship = ship;
      }

      ship.place(x, y, direction);
      this.placedShips.push(ship);

      insertShipElem(ship.elem, this.elem);
      positionShipElem(ship.elem, x, y, this.elem, this.size);
    }
  }

  rotateShip(ship) {
    const newDirection = ship.direction === 'h' ? 'v' : 'h';
    this.placeShip(ship, ship.x, ship.y, newDirection);
  }

  removeShip(ship) {
    const squares = this.getSquares(
      ship.length,
      ship.x,
      ship.y,
      ship.direction
    );

    for (const square of squares) {
      if (square.ship) square.ship = undefined;
    }

    let shipIndex = this.placedShips.findIndex((s) => s === ship);
    this.placedShips.splice(shipIndex, 1);

    ship.remove();
  }

  populate() {
    if (this.placedShips.length === 5) {
      const ships = [...this.placedShips];
      this.placedShips.forEach((ship) => {
        this.removeShip(ship);
        ship.reset();
      });
      ships.forEach((ship) => {
        const coords = this.getRandomCoords(ship.length);
        this.placeShip(ship, coords.x, coords.y, coords.direction);
      });
    } else {
      fleet.forEach((ship) => {
        ship = new Ship(ship.length, ship.name);
        const coords = this.getRandomCoords(ship.length);
        this.placeShip(ship, coords.x, coords.y, coords.direction);
      });
    }
  }

  getRandomCoords(length) {
    const coords = { x: null, y: null, direction: null };
    do {
      coords.x = getRandomCoord();
      coords.y = getRandomCoord();
      coords.direction = getRandomBool() ? 'h' : 'v';
    } while (
      this.checkSquaresValidity(
        this.getSquares(length, coords.x, coords.y, coords.direction)
      ) === false
    );
    return coords;
  }

  receiveAttack(x, y) {
    const location = this.findSquare(x, y);
    if (location && !location.shot) {
      location.shot = true;
      if (location.ship) {
        location.ship.hit();
      }
    }
  }

  get allShipsAreSunk() {
    return this.placedShips.every((ship) => ship.isSunk);
  }

  get allShipsArePlaced() {
    return (
      this.placedShips.length === 5 &&
      this.placedShips.every((ship) => ship.isPlaced)
    );
  }
}
