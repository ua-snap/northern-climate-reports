<template>
  <div class="permafrost-chart-wrapper">
    <div id="permafrost-magt-chart" />
  </div>
</template>
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
  getHistoricalLine,
  getProjectedTraces,
  detectEmptyColumns,
} from '~/utils/permafrost_charts'

export default {
  name: 'ReportMagtChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      magtData: 'permafrost/magt',
      place: 'place/name',
    }),
  },
  watch: {
    magtData: function () {
      this.renderPlot()
    },
    units: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let magtData = this.magtData
      if (!magtData) {
        return
      }

      let units = this.units == 'metric' ? 'ºC' : 'ºF'
      let precision = this.units == 'metric' ? 2 : 1

      let title = buildTitle({
        dataLabel: 'Mean annual ground temperature',
        dateRange: '1950-2100',
        place: this.place,
      })

      let yAxisLabel = 'Temperature (' + units + ')'
      let layout = getLayout(title, yAxisLabel)
      let dataTraces = []
      let freezing = this.units == 'metric' ? 0 : 32
      let uncertaintyOffset = this.units == 'metric' ? 1 : 1.8

      let historicalTrace = getHistoricalTrace(magtData, units, precision)
      if (historicalTrace != null) {
        dataTraces.push(historicalTrace)
      }

      let projectedTraces = getProjectedTraces(magtData, units, precision)
      dataTraces = dataTraces.concat(projectedTraces)

      layout.shapes.push({
        type: 'rect',
        x0: 0,
        x1: 1,
        xref: 'paper',
        y0: freezing - uncertaintyOffset,
        y1: freezing + uncertaintyOffset,
        yref: 'y',
        line: {
          width: 0,
        },
        fillcolor: '#cccccc',
        opacity: 0.2,
      })

      let footerLines = [
        'Projected values are taken from GIPL 2.0 model output.',
      ]

      let historicalLine = getHistoricalLine(magtData)
      if (historicalLine != null) {
        layout.shapes.push(historicalLine)
        footerLines.push(
          'Historical value is taken from the CRU TS 3.1 dataset'
        )
      }

      footerLines.push('The shaded gray region is the uncertainty threshold.')

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'permafrost-magt-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
