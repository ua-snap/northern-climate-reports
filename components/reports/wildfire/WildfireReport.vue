<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Wildfire</h4>
      <div class="is-size-5 mb-6">
        <p>
          The following maps charts show the historical and projected
          flammability and vegetation change for this location, computed using
          the
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
    </div>
    <ReportFlammabilityMaps />
    <div class="content mb-6">
      <p>
        This table explains different categories of modeled fire activity shown
        on the chart below and used in the introduction to this report.
      </p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" style="min-width: 10rem">Category</th>
            <th scope="col" style="min-width: 10rem">Flammability</th>
            <th scope="col">Interpretation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flamThreshold in flamThresholds">
            <th scope="row" class="category">
              <div
                class="swatch"
                :style="'background-color: ' + flamThreshold['color']"
              />
              {{ flamThreshold['label'] }}
            </th>
            <td class="numbers">
              <span v-if="flamThreshold['min'] == 0"
                >&lt;{{ flamThreshold['max'] }}&#37;</span
              >
              <span v-else-if="flamThreshold['max'] == 100"
                >&ge;{{ flamThreshold['min'] }}&#37;</span
              >
              <span v-else
                >&ge;{{ flamThreshold['min'] }}&#37;, &lt;{{
                  flamThreshold['max']
                }}&#37;</span
              >
            </td>
            <td>{{ flamThreshold['interpretation'] }}</td>
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
  vertical-align: middle;
}
.category {
  vertical-align: middle;
}
.swatch {
  width: 20px;
  height: 20px;
  border: 1px solid #999999;
  border-radius: 3px;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;
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
  computed: {
    ...mapGetters({
      flamThresholds: 'wildfire/flammabilityThresholds',
    }),
  },
}
</script>
