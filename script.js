const CLASS_X = 'x';
const CLASS_CIRCLE = 'circle';
const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');

const board = document.getElementById('board');

const winningMessageElement = document.getElementById('winningMessage');

const restartBtn = document.getElementById('restartBtn');

const turningMessageElement = document.querySelector('[data-turning-message]');
const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);

let circleTurn;

const handleClick = (event) => {
  const cell = event.target;
  const currentClass = circleTurn ? CLASS_CIRCLE : CLASS_X;

  //plasce mark
  placeMark(cell, currentClass);

  //check for win
  //check for draw
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    //switch turns
    switchTurn();
    setBoardHoverClass();
  }
};

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const switchTurn = () => {
  circleTurn = !circleTurn;
  turningMessageElement.innerHTML = `Player ${circleTurn ? "O's" : "X's"} Turn`;
};

const setBoardHoverClass = () => {
  board.classList.remove(CLASS_X);
  board.classList.remove(CLASS_CIRCLE);

  if (circleTurn) {
    board.classList.add(CLASS_CIRCLE);
  } else {
    board.classList.add(CLASS_X);
  }
};

const checkWin = (currentClass) => {
  return WINNING_CONDITIONS.some((condition) => {
    return condition.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

const isDraw = () => {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(CLASS_X) || cell.classList.contains(CLASS_CIRCLE)
    );
  });
};

const endGame = (draw) => {
  if (draw) {
    winningMessageTextElement.innerHTML = 'Draw';
  } else {
    winningMessageTextElement.innerHTML = `Player ${
      circleTurn ? "O's" : "X's"
    } Wins!`;
  }
  winningMessageElement.classList.add('show');
};

//start game
const startGame = () => {
  circleTurn = false;
  turningMessageElement.innerHTML = `Player ${circleTurn ? "O's" : "X's"} Turn`;

  cellElements.forEach((cell) => {
    cell.classList.remove(CLASS_X);
    cell.classList.remove(CLASS_CIRCLE);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
};
startGame();

restartBtn.addEventListener('click', startGame);
