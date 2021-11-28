<template>
  <div class="welcome">
    <ul class="menu cf">
      <li>
        <a href="#">new game</a>
        <ul class="submenu">
          <li>
            <a @click="$emit('changeDisplayOption', $event.target.type)" type="newPlayerGame">with player</a>
          </li>
          <li>
            <a @click="$emit('changeDisplayOption', $event.target.type)" type="newBotGame">with bot</a>
          </li>
          <li  v-if="isShowSaveGame">
            <a @click="$emit('changeDisplayOption', $event.target.type)" type="loadGame">load game</a>
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
