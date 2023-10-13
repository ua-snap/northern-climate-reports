<template>
  <section class="section">
    <div v-for="(variable, vindex) in ['evap', 'runoff']" :key="vindex">
      <h5 class="minimaps-section-title has-text-centered">
        {{ mapVar(variable) }}, <span v-html="place"></span>, 1950&ndash;2100
      </h5>
      <div v-if="variable == 'evap'" class="is-size-6 mb-4">
        <b-field label="Model">
          <b-radio
            v-model="hydro_evap_model_selection"
            name="hydro_evap_model_selection"
            native-value="3"
            >CanESM2</b-radio
          >
          <b-radio
            v-model="hydro_evap_model_selection"
            name="hydro_evap_model_selection"
            native-value="4"
            >GFDL ESM2M</b-radio
          >
          <b-radio
            v-model="hydro_evap_model_selection"
            name="hydro_evap_model_selection"
            native-value="1"
            >NCAR CCSM4</b-radio
          >
        </b-field>
      </div>
      <div v-if="variable == 'evap'" class="is-size-6 mb-4">
        <b-field label="Scenario">
          <b-radio
            v-model="hydro_evap_scenario_selection"
            name="hydro_evap_scenario_selection"
            native-value="0"
            >RCP 4.5</b-radio
          >
          <b-radio
            v-model="hydro_evap_scenario_selection"
            name="hydro_evap_scenario_selection"
            native-value="1"
            >RCP 8.5</b-radio
          >
        </b-field>
      </div>
      <div v-if="variable == 'runoff'" class="is-size-6 mb-4">
        <b-field label="Model">
          <b-radio
            v-model="hydro_runoff_model_selection"
            name="hydro_runoff_model_selection"
            native-value="3"
            >CanESM2</b-radio
          >
          <b-radio
            v-model="hydro_runoff_model_selection"
            name="hydro_runoff_model_selection"
            native-value="4"
            >GFDL ESM2M</b-radio
          >
          <b-radio
            v-model="hydro_runoff_model_selection"
            name="hydro_runoff_model_selection"
            native-value="1"
            >NCAR CCSM4</b-radio
          >
        </b-field>
      </div>
      <div v-if="variable == 'runoff'" class="is-size-6 mb-4">
        <b-field label="Scenario">
          <b-radio
            v-model="hydro_runoff_scenario_selection"
            name="hydro_runoff_scenario_selection"
            native-value="0"
            >RCP 4.5</b-radio
          >
          <b-radio
            v-model="hydro_runoff_scenario_selection"
            name="hydro_runoff_scenario_selection"
            native-value="1"
            >RCP 8.5</b-radio
          >
        </b-field>
      </div>

      <table>
        <caption>
          <h3 class="title is-5">
            {{ mapModels(modelSelection(variable)) }},
            {{ mapScenarios(scenarioSelection(variable)) }}
          </h3>
        </caption>
        <thead>
          <tr>
            <th class="left-header"></th>
            <th scope="col">Historical (1950&ndash;2009)</th>
            <th scope="col">Early-Century (2010&ndash;2039)</th>
            <th scope="col">Mid-Century (2040&ndash;2069)</th>
            <th scope="col">Late-Century (2070&ndash;2099)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(season, sindex) in ['spring', 'summer', 'fall', 'winter']"
            :key="sindex"
          >
            <th scope="row" class="left-header">
              {{ mapSeasons(season) }}
            </th>
            <td
              v-for="(era, eindex) in ['historical', 'early', 'mid', 'late']"
              :key="eindex"
              class="minimap-container"
            >
              <ReportHydrologyMap
                :var="variable"
                :model="modelSelection(variable)"
                :scenario="scenarioSelection(variable)"
                :era="era"
                :season="season"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="content mb-6">
        <p>This table is a legend for the maps above.</p>
        <ColorTable
          :unitLabel="mapVar(variable)"
          colorHeader="Color"
          :unitSymbol="unitSymbol"
          :thresholds="variable == 'evap' ? evapThresholds : runoffThresholds"
          :borderedColors="[0, 1, 2]"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ReportHydrologyMap from './ReportHydrologyMap'
import ColorTable from '../ColorTable'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportHydrologyMaps',
  components: {
    ReportHydrologyMap,
    ColorTable,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
      units: 'units',
      vars: 'hydrology/vars',
      seasons: 'hydrology/seasons',
      models: 'hydrology/models',
      scenarios: 'hydrology/scenarios',
      evapThresholds: 'hydrology/evapThresholds',
      runoffThresholds: 'hydrology/runoffThresholds',
    }),
    unitSymbol() {
      return this.units == 'imperial' ? 'in/season' : 'mm/season'
    },
  },
  methods: {
    mapVar(varName) {
      return this.vars[varName]
    },
    mapSeasons(season) {
      return _.capitalize(season)
    },
    mapModels(model) {
      return this.models[model]
    },
    mapScenarios(scenario) {
      return this.scenarios[scenario]
    },
    modelSelection(varname) {
      if (varname == 'evap') {
        return this.hydro_evap_model_selection
      } else {
        return this.hydro_runoff_model_selection
      }
    },
    scenarioSelection(varname) {
      if (varname == 'evap') {
        return this.hydro_evap_scenario_selection
      } else {
        return this.hydro_runoff_scenario_selection
      }
    },
  },
  data() {
    return {
      hydro_evap_model_selection: 3,
      hydro_evap_scenario_selection: 0,
      hydro_runoff_model_selection: 3,
      hydro_runoff_scenario_selection: 0,
    }
  },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  table-layout: fixed;

  .left-header {
    width: 5rem;
  }

  td {
    padding: 0.25rem;
  }
  th {
    text-align: center;
  }
  tbody th[scope='row'] {
    text-align: right;
    padding-right: 1.5rem;
    vertical-align: middle;
  }
}
</style>
