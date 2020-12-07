const fs = require("fs");
const _ = require("lodash");
let input = fs.readFileSync("day5/input.txt", "utf-8").trim().split("\n");

const getSeatLocation = (input, rows, columns) => {
  let seatIds = [];
  let highestSeatId = -Infinity;
  let index = 0;

  const navigate = (currentInput, currentRow, currentColumn) => {
    let exactRow = currentRow;
    let exactColumn = currentColumn;

    if (currentInput === undefined) {
      const sortedIds = _.orderBy(
        seatIds,
        ["row", "column"],
        ["asc", "asc"]
      ).sort((a, b) => a - b);
      // lol what a mess
      return sortedIds;
    }

    for (let i = 0; i < currentInput.length; i += 1) {
      let rowDifference = (exactRow[1] - exactRow[0]) / 2;
      let columnDifference = (exactColumn[1] - exactColumn[0]) / 2;

      if (currentInput[i] === "B") {
        exactRow[0] += rowDifference;
      }
      if (currentInput[i] === "F") {
        exactRow[1] -= rowDifference;
      }
      if (currentInput[i] === "R") {
        exactColumn[0] += columnDifference;
      }
      if (currentInput[i] === "L") {
        exactColumn[1] -= columnDifference;
      }
    }
    const currentSeatId = exactRow[0] * 8 + exactColumn[0];

    if (currentSeatId > highestSeatId) {
      highestSeatId = currentSeatId;
    }
    seatIds.push({
      row: exactRow[0],
      column: exactColumn[0],
      id: currentSeatId,
    });
    index += 1;
    return navigate(input[index + 1], [0, rows], [0, columns]);
  };
  return navigate(input[index], [0, rows], [0, columns]);
};

console.log("getSeatLocation:", getSeatLocation(input, 128, 8));
