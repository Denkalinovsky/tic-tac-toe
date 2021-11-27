<template>
  <div v-if="!isEndGame" class="game">
    <div class="game__info">
      <div>Game time: {{ getTimeGame }}</div>
      <div>Who now walks: {{ player }}</div>
    </div>
    <div class="box">
      <div class="content">
        <div class="game__board">
          <div
            v-for="(key, indexItem) of gameBoard"
            :key="indexItem"
            class="game__item"
            @click="changeItem(indexItem)"
          >
            {{ gameBoard[indexItem] }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <div>Game end</div>
      <div>Winner: {{ player }}</div>
      <div>Game time: {{ getTimeGame }}</div>
      <button @click="$emit('backToTheMainMenu')">Back to the main menu</button>
    </div>
  </div>
</template>

<script>
import { checkGame } from "../../helpers";

export default {
  name: "Game",
  props: {
    isPlayerGame: Boolean,
    isBotGame: Boolean,
    isSaveGame: Boolean,
  },
  data() {
    return {
      /**
       * player {string}
       */
      player: "X",
      /**
       * game board {object}
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
       * timer setInterval
       */
      timer: "",
      /**
       * time now
       */
      time: "",
      /**
       * game start time
       */
      timeInit: new Date(),
    };
  },
  methods: {
    /**
     * change the playing field element
     * @param: {string} indexItem - index in the object "gameBoard" that you want to change
     */
    changeItem(indexItem) {
      if (this.gameBoard[indexItem] !== "") return;
      this.gameBoard[indexItem] = this.player;
      this.movesLeft = this.getPossibleTransitions();
      if (
        checkGame(this.gameBoard, "O") ||
        checkGame(this.gameBoard, "X") ||
        this.movesLeft === 0
      ) {
        localStorage.clear();
        clearInterval(this.timer);
        this.isEndGame = true;
        return;
      }
      this.player = "X" === this.player ? "O" : "X";
      this.saveGame();
    },
    /**
     * save "game board" and "who walks" to Vuex and localstorage
     */
    saveGame() {
      this.$store.commit("saveGame", {
        gameBoard: this.gameBoard,
        player: this.player,
      });
      localStorage.setItem("gameBoard", JSON.stringify(this.gameBoard));
      localStorage.setItem("player", this.player);
    },
    /**
     * get the number of remaining moves
     * returns {number} movesLeft
     */
    getPossibleTransitions() {
      let movesLeft = 0;
      for (let item in this.gameBoard) {
        if (this.gameBoard[item] === "") movesLeft += 1;
      }
      return movesLeft;
    },
    /**
     * setInterval to count game time
     */
    setTimer() {
      this.timer = setInterval(() => {
        this.time = new Date();
      }, 1000);
    },
  },
  computed: {
    /**
     * get game time
     * returns {string}
     */
    getTimeGame() {
      const time = new Date(this.time - this.timeInit);
      return `${time.getMinutes() + ":" + time.getSeconds()}`;
    },
  },
  mounted() {
    this.setTimer();
    /**
     * load save game
     */
    if (this.isSaveGame) {
      this.gameBoard = JSON.parse(localStorage.getItem("gameBoard"));
      this.player = localStorage.getItem("player");
    }
    /**
     * clear localStorage
     */
    localStorage.clear();
  },
  beforeDestroy() {
    /**
     * clear interval
     */
    clearInterval(this.timer);
  },
};
</script>
