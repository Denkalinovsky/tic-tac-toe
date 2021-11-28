<template>
  <div v-if="!isEndGame" class="game">
    <div class="game__info">
      <timer :isEndGame="isEndGame" @destroy="getTimeEndGame" />
      <div>Who now walks: {{ player }}</div>
    </div>
    <div class="box">
      <div class="content">
        <div class="game__board">
          <div
            v-for="(_, indexItem) of gameBoard"
            :key="indexItem"
            class="game__item"
            @click="gameMode === 'player' ? changeItem(indexItem) : performMove(indexItem)"
          >
            {{ gameBoard[indexItem] }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="game__end">
      <div>Game end</div>
      <div v-if="getPossibleMoves(gameBoard).length !== 0">
        Winner: {{ player }}
      </div>
      <div v-else>Draw</div>
      <div>Game time: {{ gameEndTimer }}</div>
      <Btn @backToTheMainMenu="$emit('backToTheMainMenu')" />
    </div>
  </div>
</template>

<script>
import { checkGame, getScore, clone } from "../../helpers";
import { mapGetters } from "vuex";
import Timer from "./Timer";
import Btn from "./Btn";

export default {
  name: "Game",
  components: { Timer, Btn },
  props: {
    isSaveGame: Boolean,
  },
  data() {
    return {
      /**
       * Player
       */
      player: "X",
      /**
       * Game board
       */
      gameBoard: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
      },
      /**
       * Is the game over?
       */
      isEndGame: false,
      /**
       * Game time after the end of the game
       */
      gameEndTimer: "",
      /**
       * Game mode (player/bot)
       */
      gameMode: "",
    };
  },
  methods: {
    /**
     * Change the playing field element
     * @param: {string} indexItem - index in the object "gameBoard" that you want to change
     */
    changeItem(indexItem) {
      if (!this.doMove(this.gameBoard, indexItem, this.player)) return;
      if (this.isGameOver(this.gameBoard)) {
        localStorage.clear();
        this.isEndGame = true;
        return;
      }
      this.player = "X" === this.player ? "O" : "X";
      this.saveGame();
    },
    /**
     * Save "game board" and "who walks" to Vuex and localstorage
     */
    saveGame() {
      this.$store.commit("saveGame", {
        gameBoard: this.gameBoard,
        player: this.player,
        isPlayerGame: this.isPlayerGame,
      });
    },
    /**
     * Whether a move has been made
     * @param: {object} gameBoard
     * @param: {number} index
     * @param: {string} player
     * @returns {boolean}
     */
    doMove(gameBoard, index, player) {
      if (gameBoard[index] !== "") {
        return false;
      }
      gameBoard[index] = player;
      return true;
    },
    /**
     * Checks if there are possible moves
     * @param: {board} board - game board
     * @returns: {boolean}
     */
    isGameOver(board) {
      return !!(checkGame(board, "X") ||
        checkGame(board, "O") ||
        this.getPossibleMoves(board).length === 0);
    },
    /**
     * Get the remaining moves on the board
     * @param: {object} board - game board
     * @returns: {array} movesLeft - remaining moves on the board
     */
    getPossibleMoves(board) {
      let movesLeft = [];
      for (let item in board) {
        if (board[item] === "") movesLeft.push(item);
      }
      return movesLeft;
    },
    /**
     * bot game feature
     * @param: {number} index
     */
    performMove(index) {
      if (this.isEndGame) {
        return;
      }
      if (!this.doMove(this.gameBoard, index, this.player === "O" ? "O" : "X")) {
        // Invalid move
        return;
      }
      if (this.isGameOver(this.gameBoard)) {
        localStorage.clear();
        this.isEndGame = true;
        return;
      }
      let newBoard = clone(this.gameBoard);
      let aiMove = this.chooseAnOptimalMove(newBoard, this.player === "O" ? "X" : "O");
      this.doMove(this.gameBoard, aiMove.move, this.player === "O" ? "X" : "O");

      if (this.isGameOver(this.gameBoard)) {
        localStorage.clear();
        this.player = this.player === "O" ? "X" : "O";
        this.isEndGame = true;
        return;
      }
      this.saveGame();
    },
    /**
     * Choose an optimal move
     * @param: {object} board - board game
     * @param: {string} player - current player
     * @param: {number} depth - testing depth
     * @returns: score {number} , move {number}
     */
    chooseAnOptimalMove(board, player, depth = 1) {
      if (this.isGameOver(board)) {
        return {
          score: getScore(board) + depth,
          move: null,
        };
      }
      // The 'o' player wants to maximize its score, the 'x' player wants to minimize its score
      let bestScore = player === "O" ? -1000 : 1000;
      let bestMove = null;
      let moves = this.getPossibleMoves(board);
      for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        let newBoard = clone(board);
        this.doMove(newBoard, move, player);
        // Recursively call the chooseAnOptimalMove function for the new board
        const score = this.chooseAnOptimalMove(
          newBoard,
          player === "X" ? "O" : "X",
          depth + 1
        ).score;

        // If the result is better, keep it
        if (
          (player === "O" && score > bestScore) ||
          (player === "X" && score < bestScore)
        ) {
          bestScore = score;
          bestMove = move;
        }
      }
      // Return the best found score and move!
      return {
        score: bestScore,
        move: bestMove,
      };
    },
    /**
     * Get the end time of the game
     * @param: {string} data
     */
    getTimeEndGame(data) {
      this.gameEndTimer = data;
    },
    /**
     * Random when playing with a bot (who goes first)
     */
    whoStarts() {
      if (this.gameMode === "bot") {
        this.player = Math.round(Math.random()) > 0 ? "O" : "X";
        if (this.player === "O") {
          let newBoard = clone(this.gameBoard);
          let aiMove = this.chooseAnOptimalMove(newBoard, "X");
          this.doMove(this.gameBoard, aiMove.move, "X");
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getGameBoard: "getGameBoard",
      getPlayer: "getPlayer",
      getGameMode: "getGameMode",
    }),
  },
  mounted() {
    /**
     * Load save game
     */
    if (this.isSaveGame) {
      this.gameBoard = this.getGameBoard;
      this.player = this.getPlayer;
    }
    /**
     * Load game mode
     */
    this.gameMode = this.getGameMode;
    this.whoStarts();
  },
};
</script>
