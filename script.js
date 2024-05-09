let userSide = "";
let computerSide = "";
let Flag = false;

document.querySelector(".krestik").addEventListener("click", function () {
  userSide = "X";
  computerSide = "O";
  initializeGame();
});

document.querySelector(".nolik").addEventListener("click", function () {
  userSide = "O";
  computerSide = "X";
  initializeGame();
});

function initializeGame() {
  document.getElementById("choose-side").style.display = "none";
  document.getElementById("board").style.display = "grid";
  clearBoard();
  createBoard();
}

function clearBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
}

function createBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
  }
}

function handleMove(event) {
  const cell = event.target;
  if (!cell.textContent && !Flag) {
    cell.textContent = userSide;
    if (checkWin(userSide)) {
      setTimeout(() => {
        alert("Вы выиграли!");
        resetGame();
      }, 100);
    } else if (checkDraw()) {
      setTimeout(() => {
        alert("Ничья!");
        resetGame();
      }, 100);
    } else {
      Flag = true;
      setTimeout(computerMove, 500);
    }
  }
}

function computerMove() {
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.removeEventListener("click", handleMove);
  }

  const emptyCells = Array.from(cells).filter((cell) => !cell.textContent);
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = computerSide;
  if (checkWin(computerSide)) {
    setTimeout(() => {
      alert("Выиграл компьютер :(");
      resetGame();
    }, 100);
  } else if (checkDraw()) {
    setTimeout(() => {
      alert("Ничья!");
      resetGame();
    }, 100);
  } else {
    for (let cell of cells) {
      if (!cell.textContent) {
        cell.addEventListener("click", handleMove);
      }
    }
    Flag = false;
  }
}

function checkWin(side) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return lines.some((line) => {
    return line.every((index) => {
      const cell = document.getElementById(index);
      return cell.textContent === side;
    });
  });
}

function checkDraw() {
  return Array.from(document.getElementsByClassName("cell")).every(
    (cell) => cell.textContent
  );
}

function resetGame() {
  document.getElementById("choose-side").style.display = "flex";
  document.getElementById("board").style.display = "none";
  Array.from(document.getElementsByClassName("cell")).forEach((cell) => {
    cell.textContent = "";
  });
}
