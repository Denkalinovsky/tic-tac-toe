import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    gameBoard: {},
    player: "",
  },
  mutations: {
    /**
     * saving the playing field and who will walk at this point
     * @param: {object} state
     * @param: {object} gameBoard - contains the playing field
     * @param: {string} player - contains the who walks
     */
    saveGame(state, { gameBoard, player }) {
      state.gameBoard = gameBoard;
      state.player = player;
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
     * @returns: {string} player
     */
    getWhoWalks: (state) => state.player,
  },
});
