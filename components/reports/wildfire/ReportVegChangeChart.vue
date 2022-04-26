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
    </div>
    <div id="wildfire-veg-change-chart" />
  </div>
</template>
<style lang="scss" scoped>
.wildfire-chart-wrapper {
  width: 840px;
  margin: 0 auto;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import {
  getPlotSettings,
  buildTitle,
  getLayout,
  getFooter,
} from '~/utils/charts'
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

      let title = buildTitle({
        dataLabel: 'Vegetation type',
        dateRange: '1950-2099',
        place: this.place,
        huc12Id: this.huc12Id,
      })

      let yAxisLabel = 'Vegetation type coverage (%)'
      let layout = getLayout(title, yAxisLabel)
      layout['barmode'] = 'stack'
      layout['xaxis']['showdividers'] = false

      let dataTraces = []

      Object.keys(this.vegTypes).forEach(type => {
        // Don't include "not modeled" here.
        if (type == 'not_modeled') {
          return
        }

        let yValues = []
        yValues.push(
          vegChangeData['1950-2008']['MODEL-SPINUP']['historical'][type]
        )

        this.vegEras.forEach(era => {
          if (era != '1950-2008') {
            yValues.push(
              vegChangeData[era][this.veg_chart_model_selection]['rcp45'][type]
            )
          }
        })

        this.vegEras.forEach(era => {
          if (era != '1950-2008') {
            yValues.push(
              vegChangeData[era][this.veg_chart_model_selection]['rcp85'][type]
            )
          }
        })

        let trace = {
          type: 'bar',
          name: this.vegTypes[type]['label'],
          marker: {
            color: this.vegTypes[type]['color'],
          },
          hovertemplate: '%{y:.2f}%',
          x: [
            '1950-2008',
            '2010-2039_rcp45',
            '2040-2069_rcp45',
            '2070-2099_rcp45',
            '2010-2039_rcp85',
            '2040-2069_rcp85',
            '2070-2099_rcp85',
          ],
          y: yValues,
        }

        dataTraces.push(trace)
      })

      layout['xaxis']['tickmode'] = 'array'

      layout['xaxis']['tickvals'] = [
        '1950-2008',
        '2010-2039_rcp45',
        '2040-2069_rcp45',
        '2070-2099_rcp45',
        '2010-2039_rcp85',
        '2040-2069_rcp85',
        '2070-2099_rcp85',
      ]

      // Override x-axis tick text to remove the _rcpXX suffix. RCP information
      // is communicated through annotations instead.
      layout['xaxis']['ticktext'] = [
        '1950-2008',
        '2010-2039',
        '2040-2069',
        '2070-2099',
        '2010-2039',
        '2040-2069',
        '2070-2099',
      ]

      let rcpLinePadding = 0.4
      let rcpLines = [
        {
          label: 'RCP 4.5',
          xCenter: 2,
        },
        {
          label: 'RCP 8.5',
          xCenter: 5,
        },
      ]

      rcpLines.forEach(rcpLine => {
        layout.shapes.push({
          type: 'line',
          x0: rcpLine['xCenter'] - 1 - rcpLinePadding,
          x1: rcpLine['xCenter'] + 1 + rcpLinePadding,
          xref: 'x',
          y0: -0.1,
          y1: -0.1,
          yref: 'paper',
          line: {
            width: 3,
            color: '#666666',
          },
          layer: 'below',
        })

        layout.annotations.push({
          x: rcpLine['xCenter'],
          y: -0.19,
          xref: 'x',
          yref: 'paper',
          showarrow: false,
          text: rcpLine['label'],
          textangle: '0',
          font: {
            size: 13,
          },
        })
      })

      let footerLines = [
        'Projected and historical values are taken from ALFRESCO model output.',
      ]

      let footer = getFooter(footerLines, layout, false)

      // Add more vertical whitespace between chart and footer to make room
      // for RCP lines and annotations.
      footer['y'] -= 0.03

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
