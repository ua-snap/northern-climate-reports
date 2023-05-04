<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Wildfire: Flammability and Vegetation</h4>
      <div class="is-size-5 mb-6">
        <p>
          The following maps and charts show the historical and projected
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
        <p v-if="this.isPointLocation">
          Data shown in the charts below are the <strong>average</strong> for
          the watershed (HUC level 12 ID <span v-html="huc12Id"></span>) which
          contains the pixel location for <span v-html="place"></span>.
        </p>
        <p>
          Water, urbanized areas, and mountainous regions are not modeled in the
          ALFRESCO models. Pixels which are not modeled are shown as white.
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
        This table is a legend for the maps above, and explains different
        categories of modeled fire activity shown on the chart below. These
        categories are also used in the short blurb in the introduction to this
        report.
      </p>
      <ColorTable
        unitLabel="Flammability"
        unitSymbol="%"
        :thresholds="flamThresholds"
        :borderedColors="[0]"
      />
    </div>
    <div class="content mt-6 pt-6">
      <p class="is-size-5">
        Hovering over the future eras shown on the chart shows the difference
        between 1980&ndash;2009 and the future era.
      </p>
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
          Due to the inherent uncertainty involved in predicting vegetation
          transitions driven by climate and wildfire or by climate alone, the
          maps below should not be interpreted as vegetation predictions at
          specific locations, but rather as an indicator of likely general
          trends in ecological suitability for particular vegetation type over
          time. Each map&ndash;pixel shows the most commonly predicted
          vegetation type (modal value) based on 200 model runs per year across
          all years in the map&rsquo;s date range. Some ecological regions in
          the far north are projected to undergo marked changes, and others
          little or no change.
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
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;

  &.bordered {
    border: 1px solid #ccc;
  }
}
</style>
<script>
import ReportFlammabilityMaps from './ReportFlammabilityMaps'
import ReportFlammabilityChart from './ReportFlammabilityChart'
import ReportVegChangeMaps from './ReportVegChangeMaps'
import ReportVegChangeChart from './ReportVegChangeChart'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import ColorTable from '~/components/reports/ColorTable'
import { mapGetters } from 'vuex'

export default {
  name: 'WildfireReport',
  components: {
    ReportFlammabilityMaps,
    ReportFlammabilityChart,
    ReportVegChangeMaps,
    ReportVegChangeChart,
    DownloadCsvButton,
    ColorTable,
  },
  computed: {
    ...mapGetters({
      flamThresholds: 'wildfire/flammabilityThresholds',
      isPointLocation: 'place/isPointLocation',
      huc12Id: 'wildfire/huc12Id',
      place: 'place/name',
    }),
  },
}
</script>
