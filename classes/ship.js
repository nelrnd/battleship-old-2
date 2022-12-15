export class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name || 'Ship';
    this.nbOfHit = 0;
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
}
