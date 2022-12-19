import { createShipElem, rotateShipElem } from '../dom.js';

export const fleet = [
  { length: 5, name: 'Carrier' },
  { length: 4, name: 'Battleship' },
  { length: 3, name: 'Cruiser' },
  { length: 3, name: 'Submarine' },
  { length: 2, name: 'Destroyer' },
];

export class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name || 'Ship';
    this.nbOfHit = 0;
    this.elem = createShipElem(this);
  }

  hit() {
    this.nbOfHit++;
  }

  get isSunk() {
    return this.nbOfHit >= this.length;
  }

  get isPlaced() {
    return (
      this.x !== undefined &&
      this.y !== undefined &&
      this.direction !== undefined
    );
  }

  place(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.updateDirection();
  }

  remove() {
    this.x = undefined;
    this.y = undefined;
    this.direction = undefined;
  }

  updateDirection() {
    rotateShipElem(this.elem, this.direction);
  }

  reset() {
    this.nbOfHit = 0;
    this.remove();
  }
}
