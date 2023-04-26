<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Climate Protection from Spruce Beetles,
      <span v-html="place"></span>, 1988&ndash;2099
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="beetle_risk_maps_model_selection"
          name="beetle_risk_maps_model_selection"
          native-value="1"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="beetle_risk_maps_model_selection"
          name="beetle_risk_maps_model_selection"
          native-value="2"
          >GFDL ESM2M</b-radio
        >
        <b-radio
          v-model="beetle_risk_maps_model_selection"
          name="beetle_risk_maps_model_selection"
          native-value="3"
          >HadGEM2 ES</b-radio
        >
        <b-radio
          v-model="beetle_risk_maps_model_selection"
          name="beetle_risk_maps_model_selection"
          native-value="4"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="is-size-6 mb-4">
      <b-field label="Snowpack Level">
        <b-radio
          v-model="beetle_risk_maps_snowpack_selection"
          name="beetle_risk_maps_snowpack_selection"
          native-value="0"
          >Low</b-radio
        >
        <b-radio
          v-model="beetle_risk_maps_snowpack_selection"
          name="beetle_risk_maps_snowpack_selection"
          native-value="1"
          >Medium</b-radio
        >
      </b-field>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1">
        <ReportBeetleRiskMap
          model="0"
          scenario="0"
          era="0"
          :snowpack="beetle_risk_maps_snowpack_selection"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportBeetleRiskMap
          :model="beetle_risk_maps_model_selection"
          scenario="1"
          era="1"
          :snowpack="beetle_risk_maps_snowpack_selection"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportBeetleRiskMap
          :model="beetle_risk_maps_model_selection"
          scenario="1"
          era="2"
          :snowpack="beetle_risk_maps_snowpack_selection"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportBeetleRiskMap
          :model="beetle_risk_maps_model_selection"
          scenario="1"
          era="3"
          :snowpack="beetle_risk_maps_snowpack_selection"
        />
      </div>
    </div>
    <div class="columns is-flex-direction-row is-centered">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportBeetleRiskMap
          :model="beetle_risk_maps_model_selection"
          scenario="2"
          era="1"
          :snowpack="beetle_risk_maps_snowpack_selection"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportBeetleRiskMap
          :model="beetle_risk_maps_model_selection"
          scenario="2"
          era="2"
          :snowpack="beetle_risk_maps_snowpack_selection"
        />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportBeetleRiskMap
          :model="beetle_risk_maps_model_selection"
          scenario="2"
          era="3"
          :snowpack="beetle_risk_maps_snowpack_selection"
        />
      </div>
    </div>
    <div class="legend">
      <div
        class="color is-flex is-flex-direction-row"
        v-for="(beetleRisk, key, index) in beetleRisks"
      >
        <div
          class="swatch"
          :style="'background-color: ' + beetleRisk['color']"
        />
        <div>{{ beetleRisk['label'] }}</div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.legend {
  overflow: hidden;
  max-width: 760px;
  margin: 20px auto;
  line-height: 1.2;
}
.color {
  max-width: 240px;
  padding: 0 10px;
  float: left;
  margin: 4px 0;
}
.swatch {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
<script>
import ReportBeetleRiskMap from './ReportBeetleRiskMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportBeetleRiskMaps',
  components: {
    ReportBeetleRiskMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
      beetleRisks: 'beetle/beetleRisks',
    }),
  },
  data() {
    return {
      beetle_risk_maps_model_selection: 1,
      beetle_risk_maps_snowpack_selection: 1,
    }
  },
}
</script>
