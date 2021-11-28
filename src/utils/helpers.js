/**
 * Check the game for winnings
 * @param: {object} gameBoard
 * @param: {string} player
 * returns {boolean}
 */
export const checkGame = function (gameBoard, player) {
  return (
    (gameBoard[0] === player &&
    gameBoard[1] === player &&
    gameBoard[2] === player) ||
    (gameBoard[3] === player &&
    gameBoard[4] === player &&
    gameBoard[5] === player) ||
    (gameBoard[6] === player &&
    gameBoard[7] === player &&
    gameBoard[8] === player) ||
    (gameBoard[0] === player &&
    gameBoard[3] === player &&
    gameBoard[6] === player) ||
    (gameBoard[1] === player &&
    gameBoard[4] === player &&
    gameBoard[7] === player) ||
    (gameBoard[2] === player &&
    gameBoard[5] === player &&
    gameBoard[8] === player) ||
    (gameBoard[0] === player &&
    gameBoard[4] === player &&
    gameBoard[8] === player) ||
    (gameBoard[2] === player &&
    gameBoard[4] === player &&
    gameBoard[6] === player)
  );
};

/**
 * Getting the game score after the move (needed for the bot)
 * @param: {object} board - game board
 * @returns: {number} score
 */
export const getScore = function (board) {
  let score = 0;
  if (checkGame(board, "X")) {
    score -= 100;
  }
  if (checkGame(board, "O")) {
    score += 100;
  }
  return score;
};

/**
 * Clones and returns the game board
 * @param: {object} board - game board
 * @returns: {object} cloneBoard
 */
export const clone = function (board) {
  let cloneBoard = {};
  Object.assign(cloneBoard, board);
  return cloneBoard;
};
