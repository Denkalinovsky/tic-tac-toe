import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    gameBoard: [],
  },
  mutations: {
    /*
     * init game board
     * @param: {number} size - board size
     */
    startGame(state, size = 3) {
      let gameBoard = [];
      for (let indexRow = 0; indexRow < size; indexRow++) {
        gameBoard[indexRow] = new Array(size);
        for (let indexColumn = 0; indexColumn < size; indexColumn++) {
          gameBoard[indexRow][indexColumn] = {
            key: Math.random(),
            valueField: "",
          };
        }
      }
      state.gameBoard = gameBoard;
    },
    /*
     * change the value on the game board
     * @param {number} rowIndex - index row
     * @param {number} columnIndex - index column
     * @param {string} valueField - "O"/"X"
     * */
    changeItem(state, { rowIndex, columnIndex, valueField }) {
      state.gameBoard[rowIndex][columnIndex].valueField = valueField;
    },
  },
});
