import { createShipElem, rotateShipElem } from '../dom.js';

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
    return !!(this.x && this.y && this.direction);
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
}
