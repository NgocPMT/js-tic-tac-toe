const gameBoard = (function () {
  let gameBoard = Array(9).fill("0");

  const getBoard = () => gameBoard;

  const setBoard = (nextGameBoard) => (gameBoard = nextGameBoard);

  return { getBoard, setBoard };
})();

function createPlayer(name, marker, isNext) {
  const switchTurn = () => (isNext = !isNext);

  return { name, marker, isNext, switchTurn };
}

const gameController = (function () {
  const player1 = createPlayer("Player 1", "X", true);
  const player2 = createPlayer("Player 2", "O", false);

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i += 3) {
      console.log(`${board[i]} ${board[i + 1]} ${board[i + 2]}`);
    }
    console.log(`Next turn: ${player1.isNext ? player1.name : player2.name}`);
  };

  const putMark = (position) => {
    const board = gameBoard.getBoard();
    let mark = "0";
    if (player1.isNext) {
      mark = player1.marker;
      player1.switchTurn();
    } else {
      mark = player2.marker;
      player2.switchTurn();
    }

    board[position] = mark;

    gameBoard.setBoard(board);
    renderBoard();
  };

  return { renderBoard, putMark };
})();

gameController.renderBoard();
