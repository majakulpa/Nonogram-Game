let rows = 10;
let columns = 8;
let pictureArray = [];
const table = document.getElementById("nonogram-table");

function drawPicture() {
  // includes 0 and 1, where 0 is an empty field
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

  for (let i = 0; i < rows; i++) {
    let tableRow = document.createElement("tr");
    let tableHeaderCell = document.createElement("th");

    tableHeaderCell.classList.add("v-header-cell");
    table.appendChild(tableRow);
    tableRow.appendChild(tableHeaderCell);
    let horizontalGroups = [];
    let count = 0;
    let countSum = 0;

    for (let k = i * columns; k < columns + i * columns; k++) {
      if (pictureArray[k] === 1) {
        count += 1;
      }

      if (
        pictureArray[k] === 0 ||
        (pictureArray[k] === 1 && k + 1 === columns + i * columns)
      ) {
        countSum += count;
        countSum > 0 && horizontalGroups.push(countSum);
        count = 0;
        countSum = 0;
      }

      tableHeaderCell.innerHTML = horizontalGroups.join(" ");
    }

    for (let j = 0; j < columns; j++) {
      let index = j + i * columns;
      let tableCell = document.createElement("td");

      tableCell.setAttribute("tabindex", "1");
      //   tableCell.style.background = pictureArray[index] && "#909090";
      tableCell.id = `cell-${index}`;
      tableCell.classList.add("table-cell");
      // pictureArray[index] && tableCell.classList.add("filled");
      tableRow.appendChild(tableCell);
    }
  }

  for (let i = 0; i < columns; i++) {
    let tableHeaderCell = document.createElement("th");
    tableHeaderCell.classList.add("h-header-cell");
    tableHorizontalHeader.appendChild(tableHeaderCell);

    let horizontalGroups = [];
    let count = 0;
    let countSum = 0;

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
        countSum > 0 && horizontalGroups.push(countSum);
        count = 0;
        countSum = 0;
      }

      tableHeaderCell.innerHTML = horizontalGroups.join(" ");
    }
  }
}

// Array.from(tableCells).forEach(function (element) {
//   element.addEventListener("click", onCellClick);
// });

function clearGame() {
  table.replaceChildren();
}

function loadNewGame() {
  clearGame();
  drawPicture();
  loadNewBoard();
}

drawPicture();
loadNewBoard();

const tableCells = document.querySelectorAll(".table-cell");

const onCellClick = function () {
  alert("click");
};

tableCells.forEach((el) =>
  el.addEventListener("click", (event) => {
    if (event.target.classList.contains("filled")) {
      event.target.classList.remove("filled");
    } else {
      event.target.classList.add("filled");
    }
    event.target.innerHTML = "";
  })
);

tableCells.forEach((el) =>
  el.addEventListener("dblclick", (event) => {
    if (event.target.classList.contains("filled")) {
      event.target.classList.remove("filled");
    }
    event.target.innerHTML = "X";
  })
);
