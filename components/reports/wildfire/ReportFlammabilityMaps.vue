<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Flammability,
      <span v-html="place"></span>, 1950&ndash;2099
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
        <ReportFlammabilityMap model="0" scenario="0" era="1" />
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
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="1"
          era="4"
        />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1"></div>
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
      <div class="minimap-container my-4 p-1">
        <ReportFlammabilityMap
          :model="flammability_maps_model_selection"
          scenario="3"
          era="4"
        />
      </div>
    </div>
  </section>
</template>

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
