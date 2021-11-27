<template>
  <div>
    <welcome
      v-if="'welcome' === displayOption"
      @changeDisplayOption="onChangeDisplayOption"
    />
    <game
      v-if="'welcome' !== displayOption"
      :isSaveGame="isSaveGame"
      @backToTheMainMenu="clearGame"
    />
  </div>
</template>

<script>
import Welcome from "./Welcome";
import Game from "./Game";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    Welcome,
    Game,
  },
  data() {
    return {
      displayOption: "welcome",
      isSaveGame: false,
    };
  },
  methods: {
    ...mapMutations({
      saveGameMode: "saveGameMode",
    }),
    /**
     * change display option, save game mode
     * @param: {string} data - determines which component will be rendered
     */
    onChangeDisplayOption(data) {
      this.displayOption = data;
      switch (data) {
        case "newPlayerGame":
          this.saveGameMode("player");
          this.isPlayerGame = true;
          break;
        case "newBotGame":
          this.saveGameMode("bot");
          this.isBotGame = true;
          break;
        case "loadGame":
          this.isSaveGame = true;
          break;
        default:
          break;
      }
    },
    /**
     * set the default values
     */
    clearGame() {
      this.displayOption = "welcome";
      this.isPlayerGame = false;
      this.isBotGame = false;
      this.isSaveGame = false;
    },
  },
};
</script>
