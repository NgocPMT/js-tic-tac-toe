const gameBoard = (function () {
  let gameBoard = Array(9).fill("0");

  const getBoard = () => gameBoard;

  const setBoard = (nextGameBoard) => (gameBoard = nextGameBoard);

  return { getBoard, setBoard };
})();

function createPlayer(name, marker) {
  let isNext = false;

  const switchTurn = () => (isNext = !isNext);
  const isTurn = () => isNext;

  return { name, marker, isTurn, switchTurn };
}

const gameController = (function () {
  const renderBoard = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i += 3) {
      console.log(`${board[i]} ${board[i + 1]} ${board[i + 2]}`);
    }
  };

  return { renderBoard };
})();

gameController.renderBoard();
