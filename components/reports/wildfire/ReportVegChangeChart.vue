<template>
  <div class="wildfire-chart-wrapper">
    <div id="wildfire-veg-change-chart" />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings, getLayout, getFooter } from '../../../utils/charts'
import {
  getHistoricalTrace,
  getProjectedTraces,
} from '../../../utils/wildfire_charts'
export default {
  name: 'ReportVegChangeChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      vegChangeData: 'wildfire/veg_change',
    }),
  },
  watch: {
    vegChangeData: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let vegChangeData = this.vegChangeData
      if (!vegChangeData) {
        return
      }

      let title = 'Vegetation change'
      let yAxisLabel = 'Average pixels that switched vegetation type'
      let layout = getLayout(title, yAxisLabel, 600)

      let dataTraces = []

      let historicalTrace = getHistoricalTrace(vegChangeData, 'rvc')
      if (historicalTrace != null) {
        dataTraces.push(historicalTrace)
      }

      let projectedTraces = getProjectedTraces(vegChangeData, 'rvc')
      dataTraces = dataTraces.concat(projectedTraces)

      let footerLines = [
        'Projected values are taken from ALFRESCO model output.',
        'Historical values are taken from the CRU TS 4.0 dataset.',
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
