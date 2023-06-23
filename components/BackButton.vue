<template>
  <div class="back">
    <b-button
      class="default"
      tag="nuxt-link"
      to="/#controls"
      type="is-info"
      icon-left="arrow-left-circle"
    >
      <strong>Go back</strong>, pick another place</b-button
    >
  </div>
</template>
<style lang="scss" scoped>
@media (max-width: 1024px) {
  .back {
    margin-left: 1rem;
  }
}
</style>
<script>
export default {
  name: 'BackButton',
}
</script>
