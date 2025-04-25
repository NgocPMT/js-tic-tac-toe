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
    console.log(`Next turn: ${xIsNext ? player1.name : player2.name}`);
  };

  const putMark = (position) => {
    const board = gameBoard.getBoard();

    board[position] = xIsNext ? player1.marker : player2.marker;
    xIsNext = !xIsNext;

    gameBoard.setBoard(board);
    renderBoard();
  };

  return { renderBoard, putMark };
})();

gameController.renderBoard();
