/**
 * Check the game for winnings
 * @param: {object} gameBoard
 * @param: {string} player
 * returns {boolean}
 */
export const checkGame = function (gameBoard, player) {
  // Check row
  if (gameBoard[0] === player && gameBoard[1] === player && gameBoard[2] === player) return true
  if (gameBoard[3] === player && gameBoard[4] === player && gameBoard[5] === player) return true
  if (gameBoard[6] === player && gameBoard[7] === player && gameBoard[8] === player) return true

  // Check column
  if (gameBoard[0] === player && gameBoard[3] === player && gameBoard[6] === player) return true
  if (gameBoard[1] === player && gameBoard[4] === player && gameBoard[7] === player) return true
  if (gameBoard[2] === player && gameBoard[5] === player && gameBoard[8] === player) return true

  // Check diagonals
  if (gameBoard[0] === player && gameBoard[4] === player && gameBoard[8] === player) return true
  if (gameBoard[2] === player && gameBoard[4] === player && gameBoard[6] === player) return true

  return false;
};
