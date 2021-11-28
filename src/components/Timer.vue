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
       * Time now
       */
      time: new Date(0),
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
     * @returns {string}
     */
    getTimeGame() {
      let time = new Date(this.time);
      return `${time.getMinutes() + ":" + time.getSeconds()}`;
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