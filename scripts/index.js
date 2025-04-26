const game = (function () {
  const gameBoard = (function () {
    let gameBoard = Array(9).fill("");

    const getBoard = () => gameBoard;

    const setBoard = (nextGameBoard) => (gameBoard = nextGameBoard);

    return { getBoard, setBoard };
  })();

  const gameController = (function () {
    function createPlayer(name, marker) {
      return { name, marker };
    }

    let player1;
    let player2;
    let xIsNext = true;

    const initPlayer = (name, name2) => {
      player1 = createPlayer(name, "X");
      player2 = createPlayer(name2, "O");
    };

    const isBoardFull = () => {
      const board = gameBoard.getBoard();
      return board.every((tile) => !!tile);
    };

    const calculateWinner = (gameBoard) => {
      const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const line of winningLines) {
        const [a, b, c] = line;
        if (
          !!gameBoard[a] &&
          gameBoard[a] === gameBoard[b] &&
          gameBoard[a] === gameBoard[c]
        ) {
          return gameBoard[a] === "X" ? player1.name : player2.name;
        }
      }

      return null;
    };

    const getStatus = () => {
      const board = gameBoard.getBoard();
      const winner = calculateWinner(board);

      if (winner) {
        return `Winner: ${winner}`;
      } else if (isBoardFull()) {
        return "Result: Tie";
      } else {
        return `Next turn: ${xIsNext ? player1.name : player2.name}`;
      }
    };

    const putMark = (position) => {
      const board = gameBoard.getBoard();

      if (!board[position] && !calculateWinner(board)) {
        board[position] = xIsNext ? player1.marker : player2.marker;
        xIsNext = !xIsNext;
      } else if (calculateWinner(board)) {
        console.log("The game is over");
      } else {
        console.log("this tile is already marked");
      }

      gameBoard.setBoard(board);
    };

    const resetBoard = () => {
      gameBoard.setBoard(Array(9).fill(""));
      xIsNext = true;
    };

    return { initPlayer, putMark, resetBoard, getStatus };
  })();

  const displayController = (function () {
    const renderBoard = () => {
      const board = gameBoard.getBoard();

      const boardTiles = board
        .map((tile) => `<div class="board-tile">${tile}</div>`)
        .join("");

      const gameBoardEl = document.querySelector("#game-board");

      gameBoardEl.innerHTML = boardTiles;

      const boardTileEls = document.querySelectorAll(".board-tile");

      boardTileEls.forEach((tile, position) => {
        tile.addEventListener("click", () => {
          console.log(`Mark at ${position}`);
          gameController.putMark(position);
          renderBoard();
        });
      });

      const gameStatusEl = document.querySelector("#game-status");

      const status = gameController.getStatus();

      gameStatusEl.textContent = status;
    };

    return { renderBoard };
  })();

  const start = () => {
    gameController.initPlayer("John Doe", "Jane Doe");
    console.log("game started");
    displayController.renderBoard();

    startGameBtn.style.backgroundColor = "rgb(70, 70, 100)";
    startGameBtn.style.cursor = "default";
    startGameBtn.disabled = true;

    const resetGameBtn = document.querySelector("#reset-game");

    resetGameBtn.addEventListener("click", () => {
      gameController.resetBoard();
      displayController.renderBoard();
    });

    resetGameBtn.style.backgroundColor = "rgb(23, 109, 230)";
    resetGameBtn.style.cursor = "pointer";
  };

  return { start };
})();

const startGameBtn = document.querySelector("#start-game");

startGameBtn.addEventListener("click", () => {
  game.start();
});
