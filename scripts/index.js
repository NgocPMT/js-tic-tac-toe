const gameBoard = (function () {
  let gameBoard = Array(9).fill("-1");

  const getBoard = () => gameBoard;

  const setBoard = (nextGameBoard) => (gameBoard = nextGameBoard);

  return { getBoard, setBoard };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const gameController = (function () {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  let xIsNext = true;

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i += 3) {
      console.log(`${board[i]} ${board[i + 1]} ${board[i + 2]}`);
    }

    const winner = calculateWinner(board);
    console.log(winner);

    if (!winner) {
      console.log(`Next turn: ${xIsNext ? player1.name : player2.name}`);
    } else {
      console.log(`Winner: ${winner}`);
    }
  };

  const putMark = (position) => {
    const board = gameBoard.getBoard();

    if (board[position] === "-1") {
      board[position] = xIsNext ? player1.marker : player2.marker;
      xIsNext = !xIsNext;
    } else {
      console.log("this tile is already marked");
    }

    gameBoard.setBoard(board);
    renderBoard();
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
        gameBoard[a] != "-1" &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        console.log("win");
        return gameBoard[a] === "X" ? player1.name : player2.name;
      }
    }

    return null;
  };

  return { renderBoard, putMark };
})();

gameController.renderBoard();
