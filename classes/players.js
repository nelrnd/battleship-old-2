import { Grid } from './grid.js';

export class Human {
  constructor(name) {
    this.type = 'human';
    this.name = name;
    this.grid = new Grid();
  }

  placeShips() {
    this.grid.populate();
  }

  playTurn(x, y, opponentGrid) {
    opponentGrid.receiveAttack(x, y);
  }
}

export class Computer {
  constructor() {
    this.type = 'computer';
    this.grid = new Grid();
  }

  placeShips() {
    this.grid.populate();
  }
}
