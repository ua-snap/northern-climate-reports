<template>
  <div class="wildfire-chart-wrapper">
    <div id="wildfire-flammability-chart" />
  </div>
</template>
<style lang="scss" scoped>
.wildfire-chart-wrapper {
  width: 850px;
  margin: 0 auto;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings, getLayout, getFooter } from '~/utils/charts'
export default {
  name: 'ReportFlammabilityChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      flammabilityData: 'wildfire/flammability',
      flamThresholds: 'wildfire/flammabilityThresholds',
      place: 'place/name',
      isPointLocation: 'place/isPointLocation',
      huc12Id: 'wildfire/huc12Id',
    }),
  },
  watch: {
    flammabilityData: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let flammabilityData = this.flammabilityData
      if (!flammabilityData) {
        return
      }

      let name = this.isPointLocation
        ? '<br>' + this.place + ' (HUC12 ID ' + this.huc12Id + ')'
        : this.place

      let title = 'Flammability, ' + name + ', 1950-2099'
      let yAxisLabel = 'Annual chance of burning (%)'
      let layout = getLayout(title, yAxisLabel)

      // Make some room between the right-side of the chart and the legend for
      // the flammability threshold annotations.
      layout['legend']['x'] = 1.08

      let models = ['5modelAvg', 'NCAR-CCSM4', 'MRI-CGCM3']
      let scenarios = ['rcp45', 'rcp60', 'rcp85']
      let historicalEras = ['1950-1979', '1980-2008']
      let projectedEras = ['2010-2039', '2040-2069', '2070-2099']

      let traceLabels = {
        '5modelAvg': {
          rcp45: 'RCP 4.5 (5modelAvg)',
          rcp60: 'RCP 6.0 (5modelAvg)',
          rcp85: 'RCP 8.5 (5modelAvg)',
        },
        'NCAR-CCSM4': {
          rcp45: 'RCP 4.5 (NCAR CCSM4)',
          rcp60: 'RCP 6.0 (NCAR CCSM4)',
          rcp85: 'RCP 8.5 (NCAR CCSM4)',
        },
        'MRI-CGCM3': {
          rcp45: 'RCP 4.5 (MRI CGCM3)',
          rcp60: 'RCP 6.0 (MRI CGCM3)',
          rcp85: 'RCP 8.5 (MRI CGCM3)',
        },
      }

      let symbols = {
        '5modelAvg': 'circle',
        'NCAR-CCSM4': 'square',
        'MRI-CGCM3': 'cross',
      }

      let colors = {
        '5modelAvg': {
          rcp45: 'rgb(230, 150, 150)',
          rcp60: 'rgb(210, 90, 90)',
          rcp85: 'rgb(190, 30, 30)',
        },
        'NCAR-CCSM4': {
          rcp45: 'rgb(150, 150, 230)',
          rcp60: 'rgb(90, 90, 210)',
          rcp85: 'rgb(30, 30, 190)',
        },
        'MRI-CGCM3': {
          rcp45: 'rgb(210, 210, 150)',
          rcp60: 'rgb(180, 180, 90)',
          rcp85: 'rgb(140, 140, 30)',
        },
      }

      let dataTraces = []
      let displayedValues = []

      historicalEras.forEach(decade => {
        displayedValues.push(
          flammabilityData[decade]['MODEL-SPINUP']['historical']
        )
      })

      projectedEras.forEach(era => {
        models.forEach(model => {
          scenarios.forEach(scenario => {
            displayedValues.push(flammabilityData[era][model][scenario])
          })
        })
      })

      // Prevent all-zero charts from showing negative y-axis.
      // Subtract a small buffer from 0 value to avoid cropping scatter marker.
      let allZeros = displayedValues.every(value => value == 0)
      if (allZeros) {
        layout['yaxis']['range'] = [-0.1, 2]
      }

      let historicalValues = historicalEras.map(
        decade => flammabilityData[decade]['MODEL-SPINUP']['historical']
      )
      let historicalTrace = {
        type: 'scatter',
        mode: 'markers',
        name: 'Historical',
        hoverinfo: 'x+y+z+text',
        hovertemplate: '%{y:.2f}%',
        marker: {
          symbol: 'diamond',
          size: 8,
          color: '#888888',
        },
        x: historicalEras,
        y: historicalValues,
      }

      dataTraces.push(historicalTrace)

      // Use most recent historical era for difference calculation.
      let historicalValue = _.last(historicalValues)

      models.forEach(model => {
        scenarios.forEach(scenario => {
          let projectedTrace = {
            type: 'scatter',
            mode: 'markers',
            name: traceLabels[model][scenario],
            hoverinfo: 'x+y+z+text',
            marker: {
              symbol: Array(projectedEras.length).fill(symbols[model]),
              size: 8,
              color: colors[model][scenario],
            },
            x: projectedEras,
            y: [],
            customdata: [],
          }

          projectedEras.forEach(era => {
            let value = flammabilityData[era][model][scenario]
            projectedTrace['y'].push(value)
            let diff = value - historicalValue
            if (diff > 0) {
              diff = '+' + diff.toFixed(2)
            } else {
              diff = diff.toFixed(2)
            }
            projectedTrace['customdata'].push(diff)
          })

          projectedTrace['hovertemplate'] = '%{y:.2f}% <b>(%{customdata}%)</b>'
          dataTraces.push(projectedTrace)
        })
      })

      let footerLines = [
        'Projected and historical values are taken from ALFRESCO model output.',
      ]

      let thresholdShapes = []
      let thresholdAnnotations = []
      this.flamThresholds.forEach(flamThreshold => {
        if (
          _.min(displayedValues) > flamThreshold['max'] ||
          _.max(displayedValues) < flamThreshold['min']
        ) {
          return
        }

        // Prevent the threshold max from stretching out the y-axis, but add a
        // little bit of buffer to the length.
        let shapeMax = flamThreshold['max']
        if (shapeMax > _.max(displayedValues)) {
          let maxValue = _.max(displayedValues)
          let buffer = maxValue * 0.05
          if (maxValue + buffer > flamThreshold['max']) {
            buffer = flamThreshold['max'] - maxValue
          }
          shapeMax = maxValue + buffer
        }

        thresholdShapes.push({
          type: 'line',
          x0: 1.009,
          x1: 1.009,
          xref: 'paper',
          y0: flamThreshold['min'],
          y1: shapeMax,
          yref: 'y',
          line: {
            width: 10,
            color: flamThreshold['color'],
          },
          layer: 'below',
        })

        // If more than three thresholds are displayed on the graph, remove the
        // label for the smaller threshold(s) to avoid overlapping labels.
        if (thresholdAnnotations.length == 3) {
          thresholdAnnotations.shift()
        }

        let difference = shapeMax - flamThreshold['min']
        let middle = flamThreshold['min'] + difference / 2
        thresholdAnnotations.push({
          x: 1.06,
          y: middle,
          xref: 'paper',
          yref: 'y',
          text: flamThreshold['label'],
          textangle: -90,
          showarrow: false,
        })
      })

      layout.shapes = layout.shapes.concat(thresholdShapes)
      layout.annotations = layout.annotations.concat(thresholdAnnotations)

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'wildfire-flammability-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
