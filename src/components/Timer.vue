<template>
  <div>Game time: {{ getTimeGame }}</div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    /**
     * Is end game?
     */
    isEndGame: Boolean,
  },
  data() {
    return {
      /**
       * Timer setInterval
       */
      timer: "",
      /**
       * Time init (Thu Jan 01 1970 00:00:00 GMT+0300 (Москва, стандартное время))
       */
      time: new Date(0 - 1000 * 60 * 60 * 3),
    };
  },
  methods: {
    /**
     * setInterval to count game time
     */
    setTimer() {
      this.timer = setInterval(() => {
        this.time = new Date(this.time.getTime() + 1000);
      }, 1000);
    },
  },
  computed: {
    /**
     * Get game time
     * @returns {string} 00:00:00
     */
    getTimeGame() {
      let time = new Date(this.time);
      return time.toLocaleTimeString();
    },
  },
  mounted() {
    this.setTimer();
  },
  beforeDestroy() {
    /**
     * pass on to the parent the end time of the game
     */
    this.$emit("destroy", this.getTimeGame);
    /**
     * clear interval
     */
    clearInterval(this.timer);
  },
};
</script>
