<template>
  <div>
    <welcome
      v-if="'welcome' === displayOption"
      @changeDisplayOption="onChangeDisplayOption"
    />
    <game v-if="'newGamePlayer' === displayOption" />
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
    };
  },
  methods: {
    /**
     * change display option
     * @param: {string} data - determines which component will be rendered
     */
    onChangeDisplayOption(data) {
      this.displayOption = data;
    },
  },
};
</script>
