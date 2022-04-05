<template>
  <div class="wildfire-chart-wrapper">
    <div class="is-flex">
      <b-field label="Model" class="px-3">
        <div>
          <b-radio
            v-model="veg_model_selection"
            name="veg_model_selection"
            native-value="NCAR-CCSM4"
            >NCAR CCSM4</b-radio
          >
        </div>
        <div>
          <b-radio
            v-model="veg_model_selection"
            name="veg_model_selection"
            native-value="MRI-CGCM3"
            >MRI CGCM3</b-radio
          >
        </div>
      </b-field>
      <b-field label="Scenario" class="px-3">
        <b-radio
          v-model="veg_scenario_selection"
          name="veg_scenario_selection"
          native-value="rcp45"
          >RCP 4.5</b-radio
        >
        <b-radio
          v-model="veg_scenario_selection"
          name="veg_scenario_selection"
          native-value="rcp85"
          >RCP 8.5</b-radio
        >
      </b-field>
    </div>
    <div id="wildfire-veg-change-chart" />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings, getLayout, getFooter } from '~/utils/charts'
import {
  getHistoricalTrace,
  getProjectedTraces,
  allZeros,
} from '~/utils/wildfire_charts'
export default {
  name: 'ReportVegChangeChart',
  mounted() {
    this.renderPlot()
  },
  data() {
    return {
      plotType: 'box',
      veg_model_selection: 'NCAR-CCSM4',
      veg_scenario_selection: 'rcp85',
    }
  },
  computed: {
    ...mapGetters({
      vegChangeData: 'wildfire/veg_change',
      place: 'place/name',
    }),
  },
  watch: {
    vegChangeData: function () {
      this.renderPlot()
    },
    veg_model_selection: function () {
      this.renderPlot()
    },
    veg_scenario_selection: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let vegChangeData = this.vegChangeData
      if (!vegChangeData) {
        return
      }

      let title = 'Vegetation type, ' + this.place
      let yAxisLabel = 'Vegetation type coverage (%)'
      let layout = getLayout(title, yAxisLabel)

      let dataTraces = []

      let types = [
        'Not Modeled',
        'Barren/Lichen/Moss',
        'Black Spruce',
        'Deciduous Forest',
        'Graminoid Tundra',
        'Shrub Tundra',
        'Temperate Rainforest',
        'Wetland Tundra',
        'White Spruce',
      ]

      let symbols = {
        'Not Modeled': 'Not Modeled',
        'Barren/Lichen/Moss': 'square',
        'Black Spruce': 'diamond',
        'Deciduous Forest': 'cross',
        'Graminoid Tundra': 'x',
        'Shrub Tundra': 'triangle-up',
        'Temperate Rainforest': 'triangle-down',
        'Wetland Tundra': 'pentagon',
        'White Spruce': 'hexagon',
      }

      types.forEach(type => {
        let yValues = []
        let eras = ['1950-2008', '2010-2039', '2040-2069', '2070-2099']
        eras.forEach(era => {
          if (era == '1950-2008') {
            yValues.push(vegChangeData[era]['CRU-TS']['historical'][type]['vt'])
          } else {
            yValues.push(
              vegChangeData[era][this.veg_model_selection][
                this.veg_scenario_selection
              ][type]['vt']
            )
          }
        })

        let trace = {
          type: 'scatter',
          mode: 'markers',
          name: type,
          hoverinfo: 'x+y+z+text',
          hovertemplate: '%{y:.2f}%',
          marker: {
            size: 8,
            symbol: symbols[type],
          },
          x: ['1950-2008', '2010-2039', '2040-2069', '2070-2099'],
          y: yValues,
        }
        dataTraces.push(trace)
      })

      let footerLines = [
        'Projected values are taken from ALFRESCO model output.',
        'Historical values are taken from the CRU TS 4.0 dataset.',
      ]

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'wildfire-veg-change-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
