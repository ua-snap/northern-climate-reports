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
<style lang="scss" scoped>
.wildfire-chart-wrapper {
  width: 698px;
  margin: 0 auto;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings, getLayout, getFooter } from '~/utils/charts'
export default {
  name: 'ReportVegChangeChart',
  mounted() {
    this.renderPlot()
  },
  data() {
    return {
      veg_chart_model_selection: 'NCAR-CCSM4',
      veg_scenario_selection: 'rcp85',
    }
  },
  computed: {
    ...mapGetters({
      vegEras: 'wildfire/vegEras',
      vegChangeData: 'wildfire/veg_change',
      vegTypes: 'wildfire/vegTypes',
      place: 'place/name',
      isPointLocation: 'place/isPointLocation',
      huc12Id: 'wildfire/huc12Id',
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

      // Put the name of the HUC12 if it's a point location.
      let name = this.isPointLocation ? '<br>' + this.place + ' (HUC12 ID ' + this.huc12Id + ')' : this.place

      let title = 'Vegetation type, ' + name + ', 1950-2099'
      let yAxisLabel = 'Vegetation type coverage (%)'
      let layout = getLayout(title, yAxisLabel)

      let dataTraces = []

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

      Object.keys(this.vegTypes).forEach(type => {
        let yValues = []
        this.vegEras.forEach(era => {
          if (era == '1950-2008') {
            yValues.push(vegChangeData[era]['MODEL-SPINUP']['historical'][type])
          } else {
            yValues.push(
              vegChangeData[era][this.veg_chart_model_selection][
                this.veg_scenario_selection
              ][type]
            )
          }
        })

        let historicalTrace = {
          type: 'scatter',
          mode: 'markers',
          name: this.vegTypes[type]['label'],
          hoverinfo: 'x+y+z+text',
          hovertemplate: '%{y:.2f}%',
          showlegend: false,
          marker: {
            size: 8,
            symbol: symbols[type],
            color: this.vegTypes[type]['color'],
          },
          x: this.vegEras,
          y: [yValues[0]],
        }

        let projectedTrace = {
          type: 'scatter',
          mode: 'markers',
          name: this.vegTypes[type]['label'],
          hoverinfo: 'x+y+z+text',
          hovertemplate: '%{y:.2f}% <b>(%{customdata}%)</b>',
          marker: {
            size: 8,
            symbol: symbols[type],
            color: this.vegTypes[type]['color'],
          },
          x: this.vegEras,
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
        'Projected and historical values are taken from ALFRESCO model output.',
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
