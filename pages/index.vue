<template>
  <div>
    <div class="container">
      <section class="section">
        <p class="leader">
          Warming temperatures, thawing permafrost, and more wildfires are
          changing landscapes across the North. See easy-to-understand climate
          model projections for your areas of interest.
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
  line-height: 1.2;
  font-size: 2rem;
  font-weight: 500;
  width: 80vw;
  margin: 2rem auto;
}
</style>

<script>
import App from '~/components/App'

export default {
  name: 'HomePage',
  layout: 'home',
  components: {
    App,
  },
}
</script>
