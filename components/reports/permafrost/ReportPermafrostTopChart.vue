<template>
  <div class="permafrost-chart-wrapper">
    <div id="permafrost-top-chart" />
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
  getProjectedTraces,
  detectEmptyColumns,
} from '~/utils/permafrost_charts'

export default {
  name: 'ReportPermafrostTopChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      permafrostData: 'permafrost/permafrostData',
      place: 'place/name',
    }),
  },
  watch: {
    permafrostData: function () {
      this.renderPlot()
    },
    units: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let permafrostTopData = this.permafrostData

      let units = this.units == 'metric' ? 'm' : 'in'
      let precision = this.units == 'metric' ? 2 : 1

      let title = buildTitle({
        dataLabel: 'Depth to top of permafrost',
        dateRange: '2021-2099',
        place: this.place,
      })

      let yAxisLabel = 'Depth (' + units + ')'
      let orig_layout = getLayout(title, yAxisLabel)
      let layout = {
        ...orig_layout,
        yaxis: {
          ...orig_layout.yaxis,
          autorange: 'reversed',
        },
      }

      let dataTraces = getProjectedTraces(permafrostTopData, units, precision)
      let footerLines = []
      footerLines.push('Projected values are taken from GIPL 2.0 model output.')

      let yAxisAnnotationX
      if (window.innerWidth < 1250) {
        yAxisAnnotationX = -0.07
      } else {
        yAxisAnnotationX = -0.06
      }

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      layout.shapes.push({
        type: 'line',
        x0: 0,
        x1: 1,
        xref: 'paper',
        y0: 0,
        y1: 0,
        yref: 'y',
        line: {
          width: 2,
          color: '#cccccc',
        },
        layer: 'above',
      })

      layout.annotations.push({
        x: 1,
        y: 0,
        xref: 'paper',
        yref: 'y',
        text: 'Ground surface',
        showarrow: true,
        arrowcolor: '#aaaaaa',
        arrowhead: 6,
        ax: 0,
        ay: -12,
        font: {
          color: '#888888',
        },
      })

      layout.annotations.push({
        x: -0.08,
        y: 0.75,
        xref: 'paper',
        yref: 'paper',
        showarrow: true,
        text: '← Deeper',
        textangle: '-90',
        font: {
          size: 13,
        },
      })

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'permafrost-top-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
