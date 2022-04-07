<template>
  <div class="wildfire-chart-wrapper">
    <div class="is-flex">
      <b-field label="Model" class="px-3">
        <div>
          <b-radio
            v-model="veg_chart_model_selection"
            name="veg_chart_model_selection"
            native-value="NCAR-CCSM4"
            >NCAR CCSM4</b-radio
          >
        </div>
        <div>
          <b-radio
            v-model="veg_chart_model_selection"
            name="veg_chart_model_selection"
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
      veg_chart_model_selection: 'NCAR-CCSM4',
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
    veg_chart_model_selection: function () {
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

      let typeLabels = {
        not_modeled: 'Not Modeled',
        barren_lichen_moss: 'Barren/Lichen/Moss',
        black_spruce: 'Black Spruce',
        deciduous_forest: 'Deciduous Forest',
        graminoid_tundra: 'Graminoid Tundra',
        shrub_tundra: 'Shrub Tundra',
        temperate_rainforest: 'Temperate Rainforest',
        wetland_tundra: 'Wetland Tundra',
        white_spruce: 'White Spruce',
      }

      let symbols = {
        not_modeled: 'circle',
        barren_lichen_moss: 'square',
        black_spruce: 'diamond',
        deciduous_forest: 'cross',
        graminoid_tundra: 'x',
        shrub_tundra: 'triangle-up',
        temperate_rainforest: 'triangle-down',
        wetland_tundra: 'pentagon',
        white_spruce: 'hexagon',
      }

      let colors = {
        not_modeled: '#a6cee3',
        barren_lichen_moss: '#ff7f00',
        black_spruce: '#1f78b4',
        deciduous_forest: '#33a02c',
        graminoid_tundra: '#e31a1c',
        shrub_tundra: '#fb9a99',
        temperate_rainforest: '#cab2d6',
        wetland_tundra: '#fdbf6f',
        white_spruce: '#b2df8a',
      }

      Object.keys(typeLabels).forEach(type => {
        let yValues = []
        let eras = ['1950-2008', '2010-2039', '2040-2069', '2070-2099']
        eras.forEach(era => {
          if (era == '1950-2008') {
            yValues.push(vegChangeData[era]['CRU-TS']['historical'][type]['vt'])
          } else {
            yValues.push(
              vegChangeData[era][this.veg_chart_model_selection][
                this.veg_scenario_selection
              ][type]['vt']
            )
          }
        })

        let historicalTrace = {
          type: 'scatter',
          mode: 'markers',
          name: typeLabels[type],
          hoverinfo: 'x+y+z+text',
          hovertemplate: '%{y:.2f}%',
          showlegend: false,
          marker: {
            size: 8,
            symbol: symbols[type],
            color: colors[type],
          },
          x: eras,
          y: [yValues[0]],
        }

        let projectedTrace = {
          type: 'scatter',
          mode: 'markers',
          name: typeLabels[type],
          hoverinfo: 'x+y+z+text',
          hovertemplate: '%{y:.2f}% <b>(%{customdata}%)</b>',
          marker: {
            size: 8,
            symbol: symbols[type],
            color: colors[type],
          },
          x: eras,
          y: [null].concat(yValues.slice(1)),
          customdata: [null],
        }

        let historicalValue = yValues[0]
        yValues.slice(1).forEach(value => {
          let diff = value - historicalValue
          if (diff >= 0) {
            diff = '+' + diff.toFixed(2)
          } else {
            diff = diff.toFixed(2)
          }
          projectedTrace['customdata'].push(diff)
        })

        dataTraces.push(historicalTrace, projectedTrace)
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
