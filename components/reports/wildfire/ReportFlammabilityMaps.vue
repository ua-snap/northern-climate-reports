<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Flammability,
      <span v-html="place"></span>
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="flammability_maps_model_selection"
          name="flammability_maps_model_selection"
          native-value="6"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="flammability_maps_model_selection"
          name="flammability_maps_model_selection"
          native-value="5"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap model="0" scenario="0" era="0" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="1"
          era="1"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="1"
          era="2"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="1"
          era="3"
        />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="3"
          era="1"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="3"
          era="2"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="3"
          era="3"
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
  data() {
    return {
      flammability_maps_model_selection: 6,
    }
  },
}
</script>
