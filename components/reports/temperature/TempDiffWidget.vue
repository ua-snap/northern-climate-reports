<template>
  <span
    class="diff"
    :class="{ warmer: rawDiff > 0, zero: rawDiff == 0, cooler: rawDiff < 0 }"
    v-html="diff"
  ></span>
</template>
<style lang="scss" scoped>
.diff {
  display: block;

  &.warmer {
    color: #ad1f00;
  }
  &.cooler {
    color: blue;
  }
}
</style>
<script>
export default {
  name: 'TempDiffWidget',
  props: {
    future: {
      type: Number,
      required: true,
    },
    past: {
      type: Number,
      required: true,
    },
  },
  computed: {
    rawDiff() {
      return this.future - this.past
    },
    diff() {
      let diff = (this.future - this.past).toFixed(1) // for trailing 0's + consistency
      if (diff > 0) {
        diff = '&plus;' + diff
      }
      return diff
    },
  },
}
</script>
