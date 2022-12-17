import { pages } from '../pages.js';
import { Grid } from './grid.js';

export class Human {
  constructor(name) {
    this.type = 'human';
    this.name = name;
    this.grid = new Grid();
  }

  placeShips() {
    this.grid.populate();
    pages.placeShips(this.grid);
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
