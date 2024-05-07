<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Permafrost</h4>
      <div class="is-size-5">
        <div v-if="reportData">
          <span
            >The following maps show the projected mean annual ground
            temperature over time at a depth of {{ depthFragment }}.</span
          >
          <nuxt-link :to="{ name: 'data' }"
            >See information about the dataset shown here.</nuxt-link
          >
        </div>
      </div>
    </div>
    <ReportMagtMaps />
    <div class="content mb-6">
      <p>This table is a legend for the maps above.</p>
      <ColorTable
        unitLabel="Mean Annual Ground Temperature"
        colorHeader="Category"
        :unitSymbol="unitSymbol"
        :thresholds="magtThresholds"
        :borderedColors="[3, 4]"
      />
    </div>

    <div v-if="validTopData">
      <div class="content">
        <div class="is-size-5">
          As permafrost thaws, the ground depth to the top of the permafrost
          layer increases. The following chart shows how this depth is projected
          to change over time.
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
    <div v-else-if="!reportData && type != 'community' && type != 'latLng'">
      <div class="content mb-5">
        <div class="is-size-5">
          As permafrost thaws, the ground depth to the top of the permafrost
          layer increases. Because the selected place is an area, not a point
          location, a chart showing ground depth to the top of the permafrost
          layer cannot be shown because it varies across the extent of the area.
        </div>
      </div>
    </div>
    <div v-else>
      <div class="content mb-5">
        <div class="is-size-5">
          As permafrost thaws, the ground depth to the top of the permafrost
          layer increases. This cannot be shown for this place because
          permafrost data is not available for this location.
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
      return this.units == 'imperial' ? 'about 3 feet' : '1 meter'
    },
    unitSymbol() {
      return this.units == 'imperial' ? '&deg;F' : '&deg;C'
    },
    ...mapGetters({
      units: 'units',
      type: 'place/type',
      reportData: 'permafrost/permafrostData',
      magtThresholds: 'permafrost/magtThresholds',
      validTopData: 'permafrost/validTopData',
    }),
  },
}
</script>
