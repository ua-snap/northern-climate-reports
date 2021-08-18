<template>
  <div>
    <div class="container">
      <section class="section leader">
        <div class="content-wrapper">
          <div class="content is-size-4">
            <p>
              Ecosystems in the far north are changing rapidly due to several
              related climate-driven changes. Projecting how these changes are
              likely to progress in the near-term and more distant future is
              crucial for land managers, planners, and communities.
            </p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content-wrapper">
          <div class="content is-size-5">
            <p>
              Three major ecosystem drivers&mdash;temperature, permafrost, and
              fire&mdash;are linked, both in terms of what causes them and in
              terms of their effects on ecosystems.
            </p>
            <ul>
              <li>
                Some changes in species composition are directly driven by
                warming <strong>temperatures</strong>, particularly warmer
                summers, earlier springs, later autumns, and less severe
                winters.
              </li>
              <li>
                Thawing of <strong>permafrost</strong>, also driven by warming
                temperatures, alters surface drainage and increases possible
                rooting depths, yielding distinct ecological shifts.
              </li>
              <li>
                Increases in <strong>fire</strong> frequency&mdash;again
                indirectly driven by warming&mdash;also contributes to broad
                landscape-level vegetation change, as early-succession species
                increase in frequency and late-success species decrease.
              </li>
            </ul>
            <p>
              The uncertainty associated with these complex linkages is high.
              Nonetheless, by examining and modeling each factor and connecting
              model outputs when possible, we can produce a range of projections
              that explore possible changes locally, regionally, or
              landscape-wide across the far north.
            </p>
          </div>
        </div>
      </section>
    </div>
    <!--
      Place picker / map / report is all wrapped up below.
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
