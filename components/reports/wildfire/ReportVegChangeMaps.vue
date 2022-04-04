<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Vegetation change,
      <span v-html="place"></span>
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="veg_model_selection"
          name="veg_model_selection"
          native-value="1"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="veg_model_selection"
          name="veg_model_selection"
          native-value="5"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap model="0" scenario="0" era="0" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap :model="veg_model_selection" scenario="1" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap :model="veg_model_selection" scenario="1" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap :model="veg_model_selection" scenario="1" era="3" />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap :model="veg_model_selection" scenario="3" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap :model="veg_model_selection" scenario="3" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportVegChangeMap :model="veg_model_selection" scenario="3" era="3" />
      </div>
    </div>
    <div class="legend">
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-0" />
        <div>Not Modeled</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-1" />
        <div>Black Spruce</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-2" />
        <div>White Spruce</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-3" />
        <div>Deciduous Forest</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-4" />
        <div>Shrub Tundra</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-5" />
        <div>Graminoid Tundra</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-6" />
        <div>Wetland Tundra</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-7" />
        <div>Barren/Lichen/Moss</div>
      </div>
      <div class="color is-flex is-flex-direction-row">
        <div class="swatch color-8" />
        <div>Temperate Rainforest</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.legend {
  overflow: hidden;
  max-width: 600px;
  margin: 20px auto;
  line-height: 1.2;
}
.color {
  width: 200px;
  float: left;
  margin: 4px 0;
}
.swatch {
  width: 20px;
  height: 20px;
  border: 1px solid #999999;
  border-radius: 3px;
  margin-right: 8px;
}
.color-0 {
  background-color: #cccccc;
}
.color-1 {
  background-color: #009459;
}
.color-2 {
  background-color: #72cb88;
}
.color-3 {
  background-color: #fdfeec;
}
.color-4 {
  background-color: #ac916c;
}
.color-5 {
  background-color: #ede0ce;
}
.color-6 {
  background-color: #0d51fd;
}
.color-7 {
  background-color: #f2a56e;
}
.color-8 {
  background-color: #6de1e9;
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
    }),
  },
  data() {
    return {
      veg_model_selection: 1,
    }
  },
}
</script>
