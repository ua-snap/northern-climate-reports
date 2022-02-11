<template>
  <div>
    <div class="container">
      <section class="section leader">
        <div class="content-wrapper">
          <div class="content is-size-4">
            <p>
              Three forms of heat&ndash;related phenomena&mdash;warming temperatures,
              thawing permafrost, and increases in wildfire&mdash;are driving landscape change in
              Northern ecosystems. This tool uses climate data to construct a
              variety of possible futures for a warming North.
            </p>
          </div>
        </div>
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
  margin-top: 3.5rem;
  font-weight: 600;
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
