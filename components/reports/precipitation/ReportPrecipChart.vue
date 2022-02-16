<template>
  <div id="precip-chart" />
</template>
<style lang="scss" scoped></style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import {
  getPlotSettings,
  getLayout,
  getHistoricalTrace,
  getHistoricalRegion,
  getProjectedTraces,
  getFooter,
  seasons
} from '../../../utils/climate_charts'

export default {
  name: 'ReportPrecipChart',
  props: ['season'],
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      reportData: 'climate/climateData',
      place: 'place/name',
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
      let units = this.units == 'metric' ? 'mm' : 'in'

      let historicalTrace = getHistoricalTrace(
        this.reportData,
        this.season,
        'pr'
      )
      dataTraces.push(historicalTrace)

      let projectedTraces = getProjectedTraces(
        reportData,
        this.season,
        'pr',
        units
      )
      dataTraces = dataTraces.concat(projectedTraces)

      let title =
        'Historical and projected precipitation (' + seasons[this.season] + ')'
      let yAxisLabel = 'Precipitation (' + units + ')'
      let layout = getLayout(title, yAxisLabel)

      let historicalRegion = getHistoricalRegion(
        this.reportData,
        this.season,
        'pr'
      )
      layout.shapes.push(historicalRegion)

      let footerLines = [
        'The boxplot represents the interquartile range (IQR) of historical means for the season, from 1950-2009.',
        'The shaded gray region shows the extent of common variation for the historical period.',
        'The line inside the boxplot represents the median historical precipitation.',
      ]

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot('precip-chart', dataTraces, layout, plotSettings)
    },
  },
}
</script>
