<template>
  <div>
    <div class="container">
      <section class="section">
        <h2 class="title is-3">Integrated Ecosystem Modeling</h2>
        <h3 class="subtitle is-3">See projected climate data for Alaska</h3>
        <p>
          Enchiladas mint green onions blackberries hearts of palm vine tomatoes
          black bean wraps peppermint Southern Italian butternut mix roasted
          butternut squash chili pepper. Italian pepperoncini salty kung pao
          pepper cherry bomb crunchy bananas lychee blueberries chocolate
          frosted gingerbread bites tabasco pepper spicy hazelnut shiitake
          jalapeño crispy iceberg lettuce Thai dragon pepper apricot Bolivian
          rainbow pepper earl grey latte.
        </p>
      </section>
    </div>

    <!--
      Place picker / map / report is all wrapped up below.
      This needs to be outside of any `container` or `section` wrappers.
    -->
    <App></App>

  </div>
</template>

<script>
import App from '~/components/App'

export default {
  name: 'HomePage',

  components: {
    App,
  },
}
</script>
