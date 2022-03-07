<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Permafrost</h4>
      <div class="is-size-5">
        <div v-if="reportData">
          <span
            v-show="
              permafrostPresent && permafrostDisappears && !permafrostUncertain
            "
          >
            Historical data and model projections indicate that
            <strong
              >this place has permafrost which disappears within
              <span v-html="depthFragment"></span> of the ground surface over
              time.</strong
            >
          </span>
          <span
            v-show="
              permafrostPresent && !permafrostDisappears && !permafrostUncertain
            "
            >Historical data and model projections indicate that
            <strong>this place has permafrost.</strong>
          </span>
          <span
            v-show="
              !permafrostPresent && permafrostDisappears && !permafrostUncertain
            "
          >
            <strong>
              There is no permafrost within
              <span v-html="depthFragment"></span> of the ground surface at this
              location</strong
            >.
          </span>
          <span v-show="permafrostUncertain">
            <strong
              >The presence or absence of permafrost could not be determined for
              this location</strong
            >
            because the historical mean annual ground temperature falls within
            the threshold of uncertainty (<span
              v-html="uncertaintyFragment"
            ></span
            >).
          </span>
          <nuxt-link :to="{ name: 'data', hash: '#datasets' }"
            >See information about the dataset shown here.</nuxt-link
          >
        </div>
        <div class="mt-5">
          The following maps show the historical and projected mean annual
          ground temperature over time. This is the temperature of the soil
          directly above the permafrost layer. Red represents temperatures above
          freezing, blue represents temperatures below freezing, and white
          represents temperatures near the freezing point. Darker reds represent
          warmer temperatures. Darker blues represent colder temperatures.
        </div>
      </div>
    </div>
    <ReportMagtMaps />

    <div v-if="reportData">
      <div class="content">
        <div class="is-size-5">
          <span
            v-show="
              permafrostPresent && permafrostDisappears && !permafrostUncertain
            "
          >
            Projected permafrost active layer thickness and ground freeze depth
            through the end of the century are shown below. The active layer is
            the layer of soil above permafrost that thaws seasonally.
          </span>
          <span
            v-show="
              permafrostPresent && !permafrostDisappears && !permafrostUncertain
            "
          >
            Projected permafrost active layer thickness through the end of the
            century is shown below. The active layer is the layer of soil above
            permafrost that thaws seasonally.
          </span>
          <span
            v-show="
              !permafrostPresent && permafrostDisappears && !permafrostUncertain
            "
          >
            Projected ground freeze depth through the end of the century is
            shown below.
          </span>
          <span v-show="permafrostUncertain"
            >A chart of the historical and projected mean annual ground
            temperature is provided below.
          </span>
        </div>
      </div>
      <div class="chart" v-show="this.permafrostPresent">
        <ReportAltThawChart />
      </div>
      <div class="chart" v-show="this.permafrostDisappears">
        <ReportAltFreezeChart />
      </div>
      <div class="chart" v-show="this.permafrostUncertain">
        <ReportMagtChart />
      </div>
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
import ReportAltThawChart from './ReportAltThawChart'
import ReportAltFreezeChart from './ReportAltFreezeChart'
import ReportMagtChart from './ReportMagtChart'
import BackToTopButton from '~/components/reports/BackToTopButton'
import { mapGetters } from 'vuex'

export default {
  name: 'PermafrostReport',
  components: {
    ReportMagtMaps,
    ReportAltThawChart,
    ReportAltFreezeChart,
    ReportMagtChart,
    BackToTopButton,
  },
  computed: {
    // The range of uncertainty, within 1ºC of freezing.
    uncertaintyFragment() {
      return this.units == 'imperial'
        ? '30.2&ndash;33.8&deg;F'
        : '&#x00B1;1&deg;C'
    },
    depthFragment() {
      return this.units == 'imperial' ? '9.8ft' : '3m'
    },
    ...mapGetters({
      units: 'units',
      reportData: 'permafrost/permafrostData',
      permafrostPresent: 'permafrost/present',
      permafrostDisappears: 'permafrost/disappears',
      permafrostUncertain: 'permafrost/uncertain',
    }),
  },
}
</script>
