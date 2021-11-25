<template>
  <div>
    <ul>
      <li>
        <button
          @click="$emit('changeDisplayOption', $event.target.value)"
          value="newPlayerGame"
        >
          Start new game with another player
        </button>
      </li>
      <li>
        <button
          @click="$emit('changeDisplayOption', $event.target.value)"
          value="newBotGame"
        >
          Start new game with bot
        </button>
      </li>
      <li v-if="isShowSaveGame">
        <button
          @click="$emit('changeDisplayOption', $event.target.value)"
          value="loadGame"
        >
          Load game
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      isShowSaveGame: false,
    };
  },
  mounted() {
    /**
     * check if there is localstorage "gameBoard"
     */
    this.isShowSaveGame = !!localStorage.getItem("gameBoard");
  },
};
</script>
