<template>
  <div class="permafrost-chart-wrapper">
    <div id="permafrost-alt-thaw-chart" />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings, getLayout, getFooter } from '../../../utils/charts'
import {
  getHistoricalTrace,
  getHistoricalLine,
  getProjectedTraces,
  detectEmptyColumns,
} from '../../../utils/permafrost_charts'

export default {
  name: 'ReportAltThawChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      altThawData: 'permafrost/altThaw',
      place: 'place/name',
    }),
  },
  watch: {
    altThawData: function () {
      this.renderPlot()
    },
    units: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let altThawData = this.altThawData
      if (!altThawData) {
        return
      }

      let units = this.units == 'metric' ? 'm' : 'in'
      let precision = this.units == 'metric' ? 2 : 1
      let title = 'Active layer thickness, ' + this.place
      let yAxisLabel = 'Thickness (' + units + ')'
      let layout = getLayout(title, yAxisLabel)
      let dataTraces = []

      let historicalTrace = getHistoricalTrace(altThawData, units, precision)
      if (historicalTrace != null) {
        dataTraces.push(historicalTrace)
      }

      let projectedTraces = getProjectedTraces(altThawData, units, precision)
      dataTraces = dataTraces.concat(projectedTraces)

      let footerLines = []
      footerLines.push('Projected values are taken from GIPL 2.0 model output.')

      let historicalLine = getHistoricalLine(altThawData)
      if (historicalLine != null) {
        layout.shapes.push(historicalLine)
        footerLines.push(
          'Historical value is taken from the CRU TS 3.1 dataset'
        )
      }

      let emptyColumns = detectEmptyColumns(altThawData)
      if (emptyColumns) {
        footerLines.push(
          'Empty columns indicate that permafrost has disappeared for all models.'
        )
      }

      let yAxisAnnotationX
      if (window.innerWidth < 1250) {
        yAxisAnnotationX = -0.07
      } else {
        yAxisAnnotationX = -0.06
      }

      layout.annotations.push({
        x: yAxisAnnotationX,
        y: 0.07,
        xref: 'paper',
        yref: 'paper',
        showarrow: true,
        text: 'More thaw →',
        textangle: '-90',
        font: {
          size: 13,
        },
      })

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'permafrost-alt-thaw-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
