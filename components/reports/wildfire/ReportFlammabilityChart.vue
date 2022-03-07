<template>
  <div class="wildfire-chart-wrapper">
    <div class="is-size-6">
      <b-field label="Projected Data">
        <b-radio
          v-model="plotType"
          name="flammabilityPlotType"
          native-value="box"
          >Box Plot</b-radio
        >
        <b-radio
          v-model="plotType"
          name="flammabilityPlotType"
          native-value="scatter"
          >Scatter Plot</b-radio
        >
      </b-field>
    </div>
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
  allZeros,
} from '../../../utils/wildfire_charts'
export default {
  name: 'ReportFlammabilityChart',
  mounted() {
    this.renderPlot()
  },
  data() {
    return {
      plotType: 'box',
    }
  },
  computed: {
    ...mapGetters({
      flammabilityData: 'wildfire/flammability',
      place: 'place/name',
    }),
  },
  watch: {
    flammabilityData: function () {
      this.renderPlot()
    },
    plotType: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let flammabilityData = this.flammabilityData
      if (!flammabilityData) {
        return
      }

      let title = 'Relative flammability, ' + this.place
      let yAxisLabel = 'Annual chance of burning (%)'
      let layout = getLayout(title, yAxisLabel)

      // Prevent all-zero charts from showing negative y-axis.
      // Subtract a small buffer from 0 value to avoid cropping scatter marker.
      if (allZeros(flammabilityData)) {
        layout['yaxis']['range'] = [-0.1, 2]
      }

      let dataTraces = []

      let historicalTrace = getHistoricalTrace(flammabilityData, 'rf')
      if (historicalTrace != null) {
        dataTraces.push(historicalTrace)
      }

      let projectedTraces = getProjectedTraces(
        flammabilityData,
        'rf',
        this.plotType
      )
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
