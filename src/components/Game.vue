<template>
  <div class="game">
    <div
      v-for="(row, indexRow) of playground"
      :key="indexRow"
      class="game__row"
    >
      <div
        v-for="(column, indexColumn) of row"
        :key="column.key"
        class="game__row-item"
        @click="changeTheValueOnTheField(indexRow, indexColumn)"
      >
        {{ playground[indexRow][indexColumn].valueField }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Game",
  data() {
    return {
      /**
       * field dimension (int)
       */
      gameSize: 3,
      /**
       * who walks (int) true => "O", false => "X"
       */
      whoWalks: true,
    };
  },
  computed: {
    /*
     * get game board
     * returns {array[...array]} gameBoard
     */
    playground() {
      return this.$store.state.gameBoard;
    },
  },
  methods: {
    ...mapMutations({
      startGame: "startGame",
      changeItem: "changeItem",
    }),
    /*
     * change item payload
     */
    changeTheValueOnTheField(rowIndex, columnIndex) {
      this.$store.commit("changeItem", {
        rowIndex,
        columnIndex,
        valueField: this.whoWalks ? "O" : "X",
      });
      this.whoWalks = !this.whoWalks;
    },
  },
  mounted() {
    /*
     * init game board
     */
    this.startGame();
  },
};
</script>
