<template>
  <div class="spin-btn">
    <div class="center">
      <button class="btn" @click="$emit('backToTheMainMenu')">
        <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
        </svg>
        <span>Back to the main menu</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackToMenuButton"
};
</script>