<template>
  <div class="game">
    <div
      v-for="(key, indexItem) of gameBoard"
      :key="indexItem"
      class="game__item"
      @click="changeItem(indexItem)"
    >
      {{ gameBoard[indexItem] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      /**
       * who walks {string}
       */
      whoWalks: "X",
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
    };
  },
  methods: {
    /**
     * change the playing field element
     * @param: {string} indexItem - index in the object "gameBoard" that you want to change
     */
    changeItem(indexItem) {
      this.gameBoard[indexItem] = this.whoWalks;
      this.whoWalks = "X" === this.whoWalks ? "O" : "X";
      this.saveGame();
    },
    /**
     * save "game board" and "who walks" to Vuex and localstorage
     */
    saveGame() {
      this.$store.commit("saveGame", {
        gameBoard: this.gameBoard,
        whoWalks: this.whoWalks,
      });
      localStorage.setItem("gameBoard", JSON.stringify(this.gameBoard));
      localStorage.setItem("whoWalks", this.whoWalks);
    },
  },
};
</script>
