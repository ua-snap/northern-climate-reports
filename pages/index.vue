<template>
  <div>
    <HeaderBlock
      blurb="A changing climate is altering Northern landscapes.
      <br class='is-hidden-touch' />
      Explore these changes with easy-to-understand climate model projections."
    />

    <!--
      Place picker / map / report is all wrapped up below in App.
      This needs to be outside of any `container` or `section` wrappers.
    -->
    <App></App>
  </div>
</template>

<style type="scss" scoped>
.leader {
  line-height: 1.5;
  font-size: 1.4rem;
  text-align: center;
  color: #787776;
  font-weight: 700;
  margin: 2rem auto;
}
</style>

<script>
import App from '~/components/App'

export default {
  name: 'HomePage',
  components: {
    App,
  },
}
</script>
