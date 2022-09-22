<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Spruce Bark Beetle Risk</h4>
      <div class="is-size-5 mt-6">
        <p>
          These maps display three broad levels of projected
          climate&ndash;related risk of spruce bark beetle (Dendroctonus
          rufipennis) outbreaks in &ldquo;forested regions of Alaska&rdquo; as
          defined by the US Forest Service.
        </p>
        <ul>
          <li>
            These regions may or may not include white spruce and Sitka spruce,
            the Alaska tree species most at risk of beetle infestation.
          </li>
          <li>
            The model does not account for what percentage of forest cover these
            species comprise in areas where they do occur.
          </li>
          <li>
            The model does not include important non&ndash;climate&ndash;related
            factors that may affect outbreaks, including forest age, forest
            health, fire, past outbreaks, management, and other pests or
            blights.
          </li>
        </ul>
        <p>
          Past beetle outbreaks have generally occurred when climate conditions
          have been consistently favorable to beetle population growth over
          several years in a row.
        </p>
        <p>
          This model incorporates three climate&ndash;based factors, which are
          combined to calculate an overall outbreak risk for a given location
          and year:
        </p>
        <ol>
          <li>
            Beetles&rsquo; rate of maturation in response to increasing summer
            heat
          </li>
          <li>
            Fall beetle survival in autumn based on rate of seasonal cooling
          </li>
          <li>
            Survival of winter extreme cold, with or without insulating snow
          </li>
        </ol>

        <p>
          Modeled risk levels are based on climate conditions during more than
          half the years in a given time period:
        </p>
        <ul>
          <li>
            <strong>High risk</strong> means the possibility of
            <strong>rapid</strong> increase
          </li>
          <li>
            <strong>Medium risk</strong> means the possibility of
            <strong>moderate</strong>
            increase
          </li>
          <li><strong>Low risk</strong> means unlikely to increase</li>
        </ul>
        <p><a href="#">Read more detailed information</a> about this model.</p>
      </div>
    </div>
    <ReportBeetleRiskMaps />
  </div>
</template>
<script>
import ReportBeetleRiskMaps from './ReportBeetleRiskMaps'
import ColorTable from '~/components/reports/ColorTable'
import { mapGetters } from 'vuex'

export default {
  name: 'BeetleRiskReport',
  components: {
    ReportBeetleRiskMaps,
    ColorTable,
  },
  computed: {
    ...mapGetters({
      isPointLocation: 'place/isPointLocation',
      place: 'place/name',
    }),
  },
}
</script>
