import Vue from "vue";
import Vuex from "vuex";

const gameBoard = JSON.parse(localStorage.getItem("gameBoard")) || {};
const player = localStorage.getItem("player") || "";
const gameMode = localStorage.getItem("gameMode") || "";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    gameBoard,
    player,
    gameMode,
  },
  mutations: {
    /**
     * Save the playing field, who will walk
     * @param: {object} state
     * @param: {object} gameBoard - contains the playing field
     * @param: {string} player - contains the who walks
     */
    saveGame(state, { gameBoard, player }) {
      state.gameBoard = gameBoard;
      state.player = player;
      localStorage.setItem("gameBoard", JSON.stringify(gameBoard));
      localStorage.setItem("player", player);
    },
    /**
     * Save game mode
     * @param: {object} state
     * @param: {string} gameMode
     */
    saveGameMode(state, gameMode) {
      state.gameMode = gameMode;
      localStorage.setItem("gameMode", gameMode);
    },
  },
  getters: {
    /**
     * Get game board
     * @param: {object} state
     * @returns: {object} gameBoard
     */
    getGameBoard: (state) => state.gameBoard,
    /**
     * Get who walks
     * @param: {object} state
     * @returns: {string} player
     */
    getPlayer: (state) => state.player,
    /**
     * Get game mode
     * @param: {object} state
     * @returns: {string} gameMode
     */
    getGameMode: (state) => state.gameMode,
  },
});
