<template>
  <div>
    <div class="container">
      <section class="section">
        <p class="leader">
          Warming temperatures, thawing permafrost, and more wildfires are
          changing landscapes across the North.
          <br />
          Explore these changes with easy-to-understand climate model
          projections.
        </p>
      </section>
    </div>
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
