<template>
  <div class="content">
    <h4 class="title is-3">Wildfire</h4>
    <div class="is-size-5 mb-6">
      <p>
        The following maps charts show the historical and projected relative
        flammability and vegetation change for this location, computed using the
        <a href="https://uaf-snap.org/project/alfresco-and-habitat-research/"
          >ALFRESCO</a
        >
        model.
      </p>
      <p>
        Flammability is defined as the percentage of times the pixel at this
        location has burned in model simulations. All data shown, including
        historical time periods, are model ouputs.
      </p>
      <p>
        <nuxt-link :to="{ name: 'data', hash: '#datasets' }"
          >See information about the dataset shown here.</nuxt-link
        >
      </p>
    </div>

    <ReportFlammabilityMaps />
    <div class="content">
      <p>
        This table explains different categories of modeled fire activity shown
        on the chart below and used in the introduction to this report.
      </p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col" style="min-width: 10rem;">Flammability</th>
            <th scope="col">Interpretation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Very Low</th>
            <td class="numbers">&lt;0.2&#37;</td>
            <td>Fire is absent or very rare</td>
          </tr>
          <tr>
            <th scope="row">Low</th>
            <td class="numbers">&ge;0.2&#37;, &lt;0.5&#37;</td>
            <td>
              Fire is rare, and unlikely to be the primary driver of vegetation
              patterns on this landscape
            </td>
          </tr>
          <tr>
            <th scope="row">Moderate</th>
            <td class="numbers">&ge;0.5&#37;, &lt;1&#37;</td>
            <td>
              Fire is frequent enough to partially define the vegetation
              patterns on this landscape
            </td>
          </tr>
          <tr>
            <th scope="row">High</th>
            <td class="numbers">&ge;1&#37;, &lt;2&#37;</td>
            <td>
              Fire is frequent, and likely to define the vegetation patterns on
              this landscape
            </td>
          </tr>
          <tr>
            <th scope="row">Very High</th>
            <td class="numbers">&ge;2&#37;</td>
            <td>
              Fire is extremely frequent, and defines the vegetation patterns on
              this landscape
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="chart-wrapper">
      <ReportFlammabilityChart />
    </div>
    <DownloadCsvButton
      text="Download flammability data as CSV"
      endpoint="flammability"
      class="mt-3 mb-5"
    />
    <div class="content">
      <div class="is-size-5 mt-6">
        <p>
          Due to the inherent uncertainty involved in predicting wildfire, the
          maps below should not be interpreted as vegetation predictions at
          specific locations, but rather as an indicator of likely general
          trends in vegetation type over time. Each map-pixel shows the most
          commonly predicted vegetation type (modal value) based on 200 model
          runs per year across all years in the map's date range.
        </p>
      </div>
    </div>
    <ReportVegChangeMaps />
    <div class="chart-wrapper">
      <ReportVegChangeChart />
    </div>
    <DownloadCsvButton
      text="Download vegetation change data as CSV"
      endpoint="veg_type"
      class="mt-3 mb-5"
    />
  </div>
</template>
<style lang="scss" scoped>
.numbers {
  font-family: 'IBM Plex Mono', monospace;
}
</style>
<script>
import ReportFlammabilityMaps from './ReportFlammabilityMaps'
import ReportFlammabilityChart from './ReportFlammabilityChart'
import ReportVegChangeMaps from './ReportVegChangeMaps'
import ReportVegChangeChart from './ReportVegChangeChart'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import { mapGetters } from 'vuex'

export default {
  name: 'WildfireReport',
  components: {
    ReportFlammabilityMaps,
    ReportFlammabilityChart,
    ReportVegChangeMaps,
    ReportVegChangeChart,
    DownloadCsvButton,
  },
}
</script>
