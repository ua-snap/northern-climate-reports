<template>
  <div class="permafrost-chart-wrapper">
    <div id="permafrost-alt-freeze-chart" />
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
  name: 'ReportAltFreezeChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      altFreezeData: 'permafrost/altFreeze',
      place: 'place/name',
    }),
  },
  watch: {
    altFreezeData: function () {
      this.renderPlot()
    },
    units: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let altFreezeData = this.altFreezeData
      if (!altFreezeData) {
        return
      }

      let units = this.units == 'metric' ? 'm' : 'in'
      let precision = this.units == 'metric' ? 2 : 1
      let title = 'Ground freeze depth, ' + this.place
      let yAxisLabel = 'Depth (' + units + ')'
      let layout = getLayout(title, yAxisLabel)
      let dataTraces = []
      let historicalTrace = getHistoricalTrace(altFreezeData, units, precision)
      if (historicalTrace != null) {
        dataTraces.push(historicalTrace)
      }

      let projectedTraces = getProjectedTraces(altFreezeData, units, precision)
      dataTraces = dataTraces.concat(projectedTraces)

      let footerLines = []
      footerLines.push('Projected values are taken from GIPL 2.0 model output.')

      let historicalLine = getHistoricalLine(altFreezeData)
      if (historicalLine != null) {
        layout.shapes.push(historicalLine)
        footerLines.push(
          'Historical value is taken from the CRU TS 3.1 dataset'
        )
      }

      let emptyColumns = detectEmptyColumns(altFreezeData)
      if (emptyColumns) {
        footerLines.push(
          'Empty columns indicate that permafrost is still present for all models.'
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
        y: 0.1,
        xref: 'paper',
        yref: 'paper',
        showarrow: true,
        text: 'Deeper freeze →',
        textangle: '-90',
        font: {
          size: 13,
        },
      })

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'permafrost-alt-freeze-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
