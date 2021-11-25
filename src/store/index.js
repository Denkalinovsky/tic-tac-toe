import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    gameBoard: {},
    whoWalks: "",
  },
  mutations: {
    /**
     * saving the playing field and who will walk at this point
     * @param: {object} state
     * @param: {object} gameBoard - contains the playing field
     * @param: {string} whoWalks - contains the who walks
     */
    saveGame(state, { gameBoard, whoWalks }) {
      state.gameBoard = gameBoard;
      state.whoWalks = whoWalks;
    },
  },
  getters: {
    /**
     * get game board
     * @param: {object} state
     * @returns: {object} gameBoard
     */
    getGameBoard: (state) => state.gameBoard,
    /**
     * get who walks
     * @param: {object} state
     * @returns: {string} whoWalks
     */
    getWhoWalks: (state) => state.whoWalks,
  },
});
