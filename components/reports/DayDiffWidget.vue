<template>
  <span
    class="diff"
    :class="{
      weak: isWeak,
      strong: isStrong,
      less: isLess,
      more: isMore,
    }"
    v-html="diff"
  ></span>
</template>
<style lang="scss" scoped>
.diff {
  display: block;

  &.weak {
    font-weight: 300;
  }
  &.strong {
    font-weight: 500;
  }
}
</style>
<script>
export default {
  name: 'DayDiffWidget',
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
    pct() {
      return (((this.future - this.past) / this.past) * 100).toFixed(0)
    },
    // True if the difference is less than 10%, or 10mm
    isWeak() {
      return Math.abs(this.pct) < 25
    },
    isStrong() {
      return Math.abs(this.pct) > 50
    },
    isLess() {
      return this.pct < 0
    },
    isMore() {
      return this.pct > 0
    },
    diff() {
      let diff = _.round(this.future - this.past, 1)
      if (diff > 0) {
        diff = '&plus;' + diff
      } else if (diff < 0) {
        diff = '&minus;' + Math.abs(diff)
      } else {
        diff = '0'
      }
      return diff
    },
  },
}
</script>
