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
      permafrostData: 'gipl/permafrostData',
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
        dataLabel: 'Top of permafrost',
        dateRange: '2021-2099',
        place: this.place,
      })

      let yAxisLabel = 'Depth (' + units + ')'
      let layout = getLayout(title, yAxisLabel)
      // let dataTraces = []

      let dataTraces = getProjectedTraces(permafrostTopData, units, precision)
      // console.log(projectedTraces)
      // dataTraces = dataTraces.concat(projectedTraces)
      console.log(dataTraces)

      let footerLines = []
      footerLines.push('Projected values are taken from GIPL 2.0 model output.')

      // let emptyColumns = detectEmptyColumns(altFreezeData)
      // if (emptyColumns) {
      //   footerLines.push(
      //     'Empty columns indicate that permafrost is still present for all models.'
      //   )
      // }

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
        'permafrost-top-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
