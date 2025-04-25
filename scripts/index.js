const gameBoard = (function () {
  let gameBoard = [];

  const getGameBoard = () => gameBoard;

  const setGameBoard = (nextGameBoard) => (gameBoard = nextGameBoard);

  return { getGameBoard, setGameBoard };
})();

const gameController = (function () {})();

function createPlayer(name, marker) {
  let isNext = false;

  const switchTurn = () => (isNext = !isNext);
  const isTurn = () => isNext;

  return { name, marker, isTurn, switchTurn };
}
