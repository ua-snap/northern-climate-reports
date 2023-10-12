<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      {{ mapVar('evap') }}, <span v-html="place"></span>, 2021&ndash;2100
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="hydro_model_selection"
          name="hydro_model_selection"
          native-value="3"
          >CanESM2</b-radio
        >
        <b-radio
          v-model="hydro_model_selection"
          name="hydro_model_selection"
          native-value="4"
          >GFDL ESM2M</b-radio
        >
        <b-radio
          v-model="hydro_model_selection"
          name="hydro_model_selection"
          native-value="1"
          >NCAR CCSM4</b-radio
        >
      </b-field>
    </div>
    <div class="is-size-6 mb-4">
      <b-field label="Scenario">
        <b-radio
          v-model="hydro_scenario_selection"
          name="hydro_scenario_selection"
          native-value="0"
          >RCP 4.5</b-radio
        >
        <b-radio
          v-model="hydro_scenario_selection"
          name="hydro_scenario_selection"
          native-value="1"
          >RCP 8.5</b-radio
        >
      </b-field>
    </div>
    <div
      v-for="(era, eindex) in ['historical', 'early', 'mid', 'late']"
      :key="eindex"
      class="columns is-flex-direction-row is-centered"
    >
      <div
        v-for="(season, sindex) in ['spring', 'summer', 'fall', 'winter']"
        :key="sindex"
        class="minimap-container my-4 p-1"
      >
        <ReportHydrologyMap
          var="evap"
          :model="hydro_model_selection"
          :scenario="hydro_scenario_selection"
          :era="era"
          :season="season"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ReportHydrologyMap from './ReportHydrologyMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportHydrologyMaps',
  components: {
    ReportHydrologyMap,
  },
  computed: {
    ...mapGetters({
      units: 'units',
      place: 'place/name',
      vars: 'hydrology/vars',
    }),
  },
  methods: {
    mapVar(varName) {
      return this.vars[varName]
    },
  },
  data() {
    return {
      hydro_model_selection: 3,
      hydro_scenario_selection: 0,
    }
  },
}
</script>
