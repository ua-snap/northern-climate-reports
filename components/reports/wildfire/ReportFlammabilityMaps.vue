<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Flammability,
      <span v-html="place"></span>
    </h5>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          layer="relative_flammability_historical"
          map_style="climate_impact_reports"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          layer="relative_flammability_future"
          map_style="rcp45_2010-2039"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          layer="relative_flammability_future"
          map_style="rcp45_2040-2069"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          layer="relative_flammability_future"
          map_style="rcp45_2070-2099"
        />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          layer="relative_flammability_future"
          map_style="rcp85_2010-2039"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          layer="relative_flammability_future"
          map_style="rcp85_2040-2069"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          layer="relative_flammability_future"
          map_style="rcp85_2070-2099"
        />
      </div>
    </div>
    <div class="flammability-legend">
      <div class="tick is-pulled-left">0%</div>
      <div class="tick is-pulled-right">3%</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.flammability-legend {
  width: 800px;
  height: 26px;
  border: 1px solid #999;
  margin: 40px auto 0 auto;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 3px #000;
  background: linear-gradient(90deg, #ffffff 0%, #ff0000 100%);
  .tick {
    margin: 0 8px;
  }
}
</style>

<script>
import ReportFlammabilityMap from './ReportFlammabilityMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportFlammabilityMaps',
  components: {
    ReportFlammabilityMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
}
</script>
