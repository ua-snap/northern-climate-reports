<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Permafrost</h4>
      <div class="is-size-5">
        <div v-if="reportData">
          <span> New text here... </span>
          <nuxt-link :to="{ name: 'data', hash: '#datasets' }"
            >See information about the dataset shown here.</nuxt-link
          >
        </div>
        <div class="mt-5">New text here also...</div>
      </div>
    </div>
    <ReportMagtMaps />
    <div class="content mb-6">
      <p>This table is a legend for the maps above.</p>
      <ColorTable
        unitLabel="Mean Annual Ground Temperature"
        :unitSymbol="unitSymbol"
        :thresholds="magtThresholds"
        :borderedColors="[3, 4]"
      />
    </div>

    <div v-if="reportData">
      <div class="content">
        <div class="is-size-5">
          Text for new GIPL permafrost dataset goes here...
        </div>
      </div>
      <div class="chart">
        <ReportPermafrostTopChart />
      </div>
      <DownloadCsvButton
        text="Download permafrost data as CSV"
        endpoint="permafrost"
        class="mt-3 mb-5"
      />
    </div>
    <div v-else>
      <div class="content">
        <div class="is-size-5">
          Charts are not shown because it's not meaningful to average these data
          across a region.
        </div>
      </div>
    </div>
    <BackToTopButton />
  </div>
</template>
<style lang="scss" scoped>
.chart {
  width: 698px;
  margin: 0 auto;
}
</style>
<script>
import ReportMagtMaps from './ReportMagtMaps'
import ColorTable from '~/components/reports/ColorTable'
import ReportPermafrostTopChart from './ReportPermafrostTopChart'
import BackToTopButton from '~/components/reports/BackToTopButton'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import { mapGetters } from 'vuex'

export default {
  name: 'PermafrostReport',
  components: {
    ReportMagtMaps,
    ColorTable,
    ReportPermafrostTopChart,
    BackToTopButton,
    DownloadCsvButton,
  },
  computed: {
    // The range of uncertainty, within 1ºC of freezing.
    uncertaintyFragment() {
      return this.units == 'imperial'
        ? '30.2&ndash;33.8&deg;F'
        : '&#x00B1;1&deg;C'
    },
    depthFragment() {
      return this.units == 'imperial' ? 'about 10ft' : '3m'
    },
    unitSymbol() {
      return this.units == 'imperial' ? '&deg;F' : '&deg;C'
    },
    ...mapGetters({
      units: 'units',
      reportData: 'permafrost/permafrostData',
      // permafrostPresent: 'permafrost/present',
      // permafrostDisappears: 'permafrost/disappears',
      // permafrostUncertain: 'permafrost/uncertain',
      noFreeze: 'permafrost/noFreeze',
      magtThresholds: 'permafrost/magtThresholds',
    }),
  },
}
</script>
