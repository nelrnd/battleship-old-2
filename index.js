import { Grid } from './classes/grid.js';
import { Computer, Human } from './classes/players.js';
import {
  clearPage,
  displayElem,
  displayGrid,
  makeShipMoveable,
} from './dom.js';

window.addEventListener('load', () => {
  const player1 = new Human('Joe');
  const player2 = new Computer();

  player1.placeShips();
  player2.placeShips();

  const setShips = (grid) => {
    clearPage();
    displayGrid(grid);

    for (const ship of grid.placedShips) {
      makeShipMoveable(ship, grid);
    }

    const randomizeBtn = document.createElement('button');
    randomizeBtn.onclick = () => grid.populate();
    randomizeBtn.className = 'btn';
    randomizeBtn.textContent = 'Randomize';

    const startBtn = document.createElement('button');
    startBtn.onclick = () => startGame();
    startBtn.className = 'btn';
    startBtn.textContent = 'Start game';

    const buttons = document.createElement('div');
    buttons.className = 'btns';
    buttons.appendChild(randomizeBtn);
    buttons.appendChild(startBtn);

    displayElem(buttons);
  };

  const startGame = () => {
    clearPage();
    displayGrid(player1.grid);
    displayGrid(player2.grid);
  };

  setShips(player1.grid);
});
