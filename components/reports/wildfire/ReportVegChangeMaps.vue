<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Vegetation type,
      <span v-html="place"></span>, 1950&ndash;2099
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="veg_maps_model_selection"
          name="veg_maps_model_selection"
          native-value="5"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="veg_maps_model_selection"
          name="veg_maps_model_selection"
          native-value="4"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="0" scenario="0" era="0" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap
          :model="veg_maps_model_selection"
          scenario="1"
          era="1"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap
          :model="veg_maps_model_selection"
          scenario="1"
          era="2"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap
          :model="veg_maps_model_selection"
          scenario="1"
          era="3"
        />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap
          :model="veg_maps_model_selection"
          scenario="3"
          era="1"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap
          :model="veg_maps_model_selection"
          scenario="3"
          era="2"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap
          :model="veg_maps_model_selection"
          scenario="3"
          era="3"
        />
      </div>
    </div>
    <div class="legend">
      <div
        class="color is-flex is-flex-direction-row"
        v-for="(vegType, key, index) in vegTypes"
      >
        <div
          class="swatch"
          :class="{ bordered: ifBordered(index) }"
          :style="'background-color: ' + vegType['color']"
        />
        <div>{{ vegType['label'] }}</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.legend {
  overflow: hidden;
  max-width: 660px;
  margin: 20px auto;
  line-height: 1.2;
}
.color {
  width: 220px;
  padding: 0 10px;
  float: left;
  margin: 4px 0;
}
.swatch {
  width: 20px;
  height: 20px;
  margin-right: 8px;

  &.bordered {
    border: 1px solid #ccc;
  }
}
</style>

<script>
import ReportVegChangeMap from './ReportVegChangeMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportVegChangeMaps',
  components: {
    ReportVegChangeMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
      vegTypes: 'wildfire/vegTypes',
    }),
  },
  methods: {
    ifBordered(index) {
      // Add border around pale colors to increase visibility
      let bordered = [0]
      return _.includes(bordered, index)
    },
  },
  data() {
    return {
      veg_maps_model_selection: 5,
    }
  },
}
</script>
