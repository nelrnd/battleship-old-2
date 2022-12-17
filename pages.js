import { clearPage, displayElem } from './dom.js';

export const pages = {
  placeShips: (grid) => {
    clearPage();
    displayElem(grid.elem);

    const randomizeBtn = document.createElement('button');
    randomizeBtn.className = 'button';
    randomizeBtn.textContent = 'Randomize';

    const startBtn = document.createElement('button');
    startBtn.className = 'button';
    startBtn.textContent = 'Start game';

    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    buttons.appendChild(randomizeBtn);
    buttons.appendChild(startBtn);

    displayElem(buttons);
  },
};
