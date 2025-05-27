<template>
  <div class="temp-chart-wrapper">
    <div id="temp-chart" />
  </div>
</template>
<style lang="scss" scoped>
.temp-chart-wrapper {
  padding-bottom: 0rem;
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
import {
  getHistoricalTrace,
  getHistoricalRegion,
  getProjectedTraces,
  seasons,
} from '~/utils/climate_charts'

export default {
  name: 'ReportTempChart',
  props: ['season'],
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      place: 'place/name',
      reportData: 'climate/climateData',
    }),
  },
  watch: {
    reportData: function () {
      this.renderPlot()
    },
    season: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let reportData = this.reportData
      if (!reportData) {
        return
      }

      let dataTraces = []
      let units = this.units == 'metric' ? 'ºC' : 'ºF'
      let freezing = this.units == 'metric' ? 0 : 32

      let historicalTrace = getHistoricalTrace(
        this.reportData,
        this.season,
        'tas'
      )
      dataTraces.push(historicalTrace)

      let projectedTraces = getProjectedTraces(
        reportData,
        this.season,
        'tas',
        units
      )
      dataTraces = dataTraces.concat(projectedTraces)

      let title = buildTitle({
        dataLabel: 'Temperature',
        dateRange: '1950-2099',
        place: this.place,
        season: seasons[this.season],
      })

      let yAxisLabel = 'Temperature (' + units + ')'
      let layout = getLayout(title, yAxisLabel)

      let historicalRegion = getHistoricalRegion(
        this.reportData,
        this.season,
        'tas'
      )
      layout.shapes.push(historicalRegion)

      let footerLines = [
        'The boxplot on the left represents the interquartile range (IQR) of historical means for the season, from 1950–2009 (CRU TS 4.0).',
        'The shaded gray region shows the extent of common variation for the historical period.',
        'The line inside the boxplot represents the median historical temperature.',
      ]

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let allValues = []
      _.eachDeep(reportData, (outsideValue, outsideKey) => {
        if (outsideKey == this.season) {
          _.eachDeep(outsideValue, (insideValue, insideKey) => {
            if (insideKey == 'tas' && _.isNumber(insideValue)) {
              allValues.push(insideValue)
            }
          })
        }
      })

      // Draw freezing line only if it falls within range of displayed data to
      // prevent it from extending the y-axis.
      if (_.inRange(freezing, _.min(allValues), _.max(allValues))) {
        layout.shapes.push({
          type: 'line',
          x0: 0,
          x1: 1,
          xref: 'paper',
          y0: freezing,
          y1: freezing,
          yref: 'y',
          line: {
            width: 2,
            color: '#cccccc',
          },
          layer: 'below',
        })
        layout.annotations.push({
          x: 1,
          y: freezing,
          xref: 'paper',
          yref: 'y',
          text: 'Freezing',
          showarrow: true,
          arrowcolor: '#aaaaaa',
          arrowhead: 6,
          ax: 0,
          ay: -12,
          font: {
            color: '#888888',
          },
        })
      }

      let plotSettings = getPlotSettings({
        dataLabel: 'Temperature',
        place: this.place,
        season: seasons[this.season],
        dateRange: '1950-2099',
      })
      this.$Plotly.newPlot('temp-chart', dataTraces, layout, plotSettings)
    },
  },
}
</script>
