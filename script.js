const table = document.getElementById("nonogram-table");

let rows = 10;
let columns = 10;
let pictureArray = [];
let winnerCells = [];

function getRowsAndColumns() {
  rows = +document.getElementById("rows-number").value;
  columns = +document.getElementById("columns-number").value;
}

/**
 * Draw new game board
 */

function drawPicture() {
  // includes random 0 and 1, where 0 is an empty cell
  for (let i = 0; i < columns * rows; i++) {
    pictureArray[i] = Math.round(Math.random());
  }
  return pictureArray;
}

function loadNewBoard() {
  const tableHorizontalHeader = document.createElement("tr");
  table.appendChild(tableHorizontalHeader);
  const emptyCell = document.createElement("td");
  tableHorizontalHeader.appendChild(emptyCell);

  // Add numbers to the left side headers
  for (let i = 0; i < rows; i++) {
    let tableRow = document.createElement("tr");
    let tableHeaderCell = document.createElement("th");
    let count = 0;
    let countSum = 0;

    tableHeaderCell.classList.add("v-header-cell", "header");
    table.appendChild(tableRow);
    tableRow.appendChild(tableHeaderCell);
    tableRow.classList.add("table-row");

    for (let k = i * columns; k < columns + i * columns; k++) {
      if (pictureArray[k] === 1) {
        count += 1;
      }

      if (
        pictureArray[k] === 0 ||
        (pictureArray[k] === 1 && k + 1 === columns + i * columns)
      ) {
        countSum += count;

        const numberSpan = document.createElement("span");

        if (countSum > 0) {
          numberSpan.innerHTML = countSum;
          tableHeaderCell.appendChild(numberSpan);
        }

        count = 0;
        countSum = 0;
      }
    }

    for (let j = 0; j < columns; j++) {
      let index = j + i * columns;
      let tableCell = document.createElement("td");

      if (j === 0 && i === 0) {
        tableCell.setAttribute("tabindex", "0");
      } else {
        tableCell.setAttribute("tabindex", "1");
      }

      tableCell.id = `cell-${index}`;
      tableCell.classList.add("table-cell");
      pictureArray[index] && winnerCells.push(tableCell);
      tableRow.appendChild(tableCell);
    }
  }

  // Add numbers to the top headers
  for (let i = 0; i < columns; i++) {
    let tableHeaderCell = document.createElement("th");
    let count = 0;
    let countSum = 0;

    tableHeaderCell.classList.add("h-header-cell", "header");
    tableHorizontalHeader.appendChild(tableHeaderCell);

    for (let j = 0; j < rows; j++) {
      let index = i + j * columns;

      if (pictureArray[index] === 1) {
        count += 1;
      }

      if (
        pictureArray[index] === 0 ||
        (pictureArray[index] === 1 && index === columns * (rows - 1) + i)
      ) {
        countSum += count;

        const numberSpan = document.createElement("span");

        if (countSum > 0) {
          numberSpan.innerHTML = countSum;
          tableHeaderCell.appendChild(numberSpan);
        }

        count = 0;
        countSum = 0;
      }
    }
  }
}

/**
 * Cell click events
 */

function onCellClick(event) {
  if (event.target.classList.contains("filled")) {
    event.target.classList.remove("filled");
  } else {
    event.target.classList.add("filled");
  }
  if (event.target.classList.contains("crossed")) {
    event.target.classList.remove("crossed");
  }
}

function onCellDblClick(event) {
  if (event.target.classList.contains("filled")) {
    event.target.classList.remove("filled");
  }
  event.target.classList.add("crossed");
}

function onNumberClick(event) {
  if (event.target.classList.contains("numberCrossed")) {
    event.target.classList.remove("numberCrossed");
  } else {
    event.target.classList.add("numberCrossed");
  }
}

function bindEvents() {
  const tableCells = document.querySelectorAll(".table-cell");
  const tableHeader = document.querySelectorAll(".header");

  tableHeader.forEach((el) =>
    el.addEventListener("click", (event) => {
      onNumberClick(event);
    })
  );

  tableCells.forEach((el) =>
    el.addEventListener("click", (event) => {
      onCellClick(event);
    })
  );

  tableCells.forEach((el) =>
    el.addEventListener("keyup", (event) => {
      if (event.code === "Enter") {
        onCellClick(event);
      }
      if (event.code === "Space") {
        onCellDblClick(event);
      }
    })
  );

  tableCells.forEach((el) =>
    el.addEventListener("dblclick", (event) => {
      onCellDblClick(event);
    })
  );
}

/**
 * Clear existing game
 */

function clearGame() {
  table.replaceChildren();
  winnerCells = [];
}

/**
 * Load new game
 */

function onLoad() {
  drawPicture();
  loadNewBoard();
  bindEvents();
}

function loadNewGame() {
  clearGame();
  getRowsAndColumns();
  onLoad();
}

onLoad();

/**
 * Check game solution
 */

function checkSolution() {
  const guessedCells = document.querySelectorAll(".filled");
  const guessedArray = [...guessedCells];
  const guesses = guessedArray.map((cell) => cell.id);
  const winners = winnerCells.map((cell) => cell.id);

  const gameWon =
    guesses.length === winners.length &&
    guesses.every((value, index) => value === winners[index]);

  gameWon
    ? alert("Congratulations! You won!")
    : alert("You lost... Keep trying!");
}

/**
 * Give a clue on request, add fill or remove one if wrong
 */

function giveClue() {
  const guessedCells = document.querySelectorAll(".filled");
  const guessedArray = [...guessedCells];
  const firstNotGuessed = winnerCells.find(
    (cell) => !guessedArray.includes(cell)
  );
  const firstWrong =
    guessedArray && guessedArray.find((cell) => !winnerCells.includes(cell));

  firstNotGuessed?.classList.add("filled");
  firstWrong?.classList.remove("filled");

  if (!firstWrong && !firstNotGuessed) {
    alert("Congratulations! You won!");
  }
}
