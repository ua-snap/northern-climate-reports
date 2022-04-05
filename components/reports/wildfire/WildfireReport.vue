<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Wildfire</h4>
      <div class="is-size-5 mb-6">
        <p>
          The following charts show the historical and projected flammability
          and vegetation change for this location. Values represent the
          percentage of times the pixel at this location has burned, or changed
          dominant vegetation type, for varios models and scenarios.
          <nuxt-link :to="{ name: 'data', hash: '#datasets' }"
            >See information about the dataset shown here.</nuxt-link
          >
        </p>
      </div>
    </div>
    <ReportFlammabilityMaps />
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
      endpoint="veg_change"
      class="mt-3 mb-5"
    />
  </div>
</template>
<style></style>
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
