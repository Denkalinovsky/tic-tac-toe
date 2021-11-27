<template>
  <div class="welcome">
    <ul class="menu cf">
      <li>
        <a href="#">new game</a>
        <ul class="submenu">
          <li
            @click="$emit('changeDisplayOption', $event.target.value)"
            value="newPlayerGame"
          >
            <a href="#">with player</a>
          </li>
          <li
            @click="$emit('changeDisplayOption', $event.target.value)"
            value="newBotGame"
          >
            <a href="#">with bot</a>
          </li>
          <li
            v-if="isShowSaveGame"
            @click="$emit('changeDisplayOption', $event.target.value)"
            value="loadGame"
          >
            <a href="#">load game</a>
          </li>
        </ul>
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
