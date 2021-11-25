<template>
  <div>
    <welcome
      v-if="'welcome' === displayOption"
      @changeDisplayOption="onChangeDisplayOption"
    />
    <game
      v-if="'welcome' !== displayOption"
      :isPlayerGame="isPlayerGame"
      :isBotGame="isBotGame"
      :isSaveGame="isSaveGame"
    />
  </div>
</template>

<script>
import Welcome from "./Welcome";
import Game from "./Game";

export default {
  name: "Home",
  components: {
    Welcome,
    Game,
  },
  data() {
    return {
      displayOption: "welcome",
      isPlayerGame: false,
      isBotGame: false,
      isSaveGame: false,
    };
  },
  methods: {
    /**
     * change display option
     * @param: {string} data - determines which component will be rendered
     */
    onChangeDisplayOption(data) {
      this.displayOption = data || "";
      switch (data) {
        case "newPlayerGame":
          this.isPlayerGame = true;
          break;
        case "newBotGame":
          this.isBotGame = true;
          break;
        case "loadGame":
          this.isSaveGame = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>
