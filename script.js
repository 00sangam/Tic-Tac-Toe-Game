const GameBoard = document.querySelector("#gameboard");
const Info = document.querySelector("#info");
const startcells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
Info.textContent = "Circle goes first";

const checkScore = () => {
  const allSquares = document.querySelectorAll(".square");
  const winningCalls = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [3, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningCalls.forEach((element) => {
    const circleWins = element.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      Info.textContent = "Circle won!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
  winningCalls.forEach((element) => {
    const crossWins = element.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (crossWins) {
      Info.textContent = "Cross won!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
};

const addGo = (e) => {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  Info.textContent = `It's now ${go} 's go it`;
  e.target.removeEventListener("click", addGo);
  checkScore();
};

const createBoard = () => {
  startcells.forEach((_cell, index) => {
    const cellboard = document.createElement("div");
    cellboard.classList.add("square");
    cellboard.id = index;
    cellboard.addEventListener("click", addGo);
    GameBoard.append(cellboard);
  });
};
createBoard();
