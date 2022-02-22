<template>
  <div class="wildfire-chart-wrapper">
    <div id="wildfire-flammability-chart" />
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
  name: 'ReportFlammabilityChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      flammabilityData: 'wildfire/flammability',
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

      let title = 'Relative flammability'
      let yAxisLabel = 'Average pixels burned'
      let layout = getLayout(title, yAxisLabel, 600)

      let dataTraces = []

      let historicalTrace = getHistoricalTrace(flammabilityData, 'rf')
      if (historicalTrace != null) {
        dataTraces.push(historicalTrace)
      }

      let projectedTraces = getProjectedTraces(flammabilityData, 'rf')
      dataTraces = dataTraces.concat(projectedTraces)

      let footerLines = [
        'Projected values are taken from ALFRESCO model output.',
        'Historical values are taken from the CRU TS 4.0 dataset.',
      ]

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
