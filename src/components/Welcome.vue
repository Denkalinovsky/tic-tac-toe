<template>
  <div>
    <ul>
      <li>
        <button
          @click="$emit('changeDisplayOption', $event.target.value)"
          value="newGamePlayer"
        >
          Start new game with another player
        </button>
      </li>
      <li>
        <button
          @click="$emit('changeDisplayOption', $event.target.value)"
          value="newGameBot"
        >
          Start new game with bot
        </button>
      </li>
      <li>
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
};
</script>
