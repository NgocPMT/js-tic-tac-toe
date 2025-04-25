const gameBoard = (function () {
  let gameBoard = [];

  const getGameBoard = () => gameBoard;

  const setGameBoard = (nextGameBoard) => (gameBoard = nextGameBoard);

  return { getGameBoard, setGameBoard };
})();

const gameController = (function () {})();

function createPlayer(name, marker) {
  return { name, marker };
}
