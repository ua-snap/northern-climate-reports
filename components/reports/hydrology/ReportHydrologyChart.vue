<template>
  <div id="hydrology-chart" />
</template>
<style lang="scss" scoped></style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import {
  getPlotSettings,
  buildTitle,
  getLayout,
  getFooter,
} from '~/utils/charts'
import { getProjectedTraces } from '~/utils/hydrology_charts'

export default {
  name: 'ReportHydrologyChart',
  props: ['variable', 'model', 'scenario'],
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      reportData: 'hydrology/hydrologyData',
      place: 'place/name',
    }),
  },
  watch: {
    reportData: function () {
      this.renderPlot()
    },
    variable: function () {
      this.renderPlot()
    },
    model: function () {
      this.renderPlot()
    },
    scenario: function () {
      this.renderPlot()
    },
  },
  methods: {
    variableTitle: function (variable) {
      let variables = {
        evap: 'Actual Evapotranspiration',
        glacier_melt: 'Glacier Melt',
        iwe: 'Ice Water Equivalent',
        pcp: 'Daily Precipitation',
        runoff: 'Surface Runoff',
        sm1: 'Soil Moisture Layer 1',
        sm2: 'Soil Moisture Layer 2',
        sm3: 'Soil Moisture Layer 3',
        snow_melt: 'Snow Melt',
        swe: 'Snow Water Equivalent',
        tmax: 'Maximum Daily 2m Air Temperature',
        tmin: 'Minimum Daily 2m Air Temperature',
      }
      return variables[variable]
    },
    renderPlot: function () {
      let reportData = this.reportData
      if (!reportData) {
        return
      }

      let units = this.units == 'metric' ? 'mm' : 'in'

      let dataTraces = getProjectedTraces(
        reportData,
        this.variable,
        this.model,
        this.scenario,
        units
      )

      let scenario = 'RCP 4.5'
      if (this.scenario == 'rcp85') scenario = 'RCP 8.5'

      let title = buildTitle({
        dataLabel: this.variableTitle(this.variable),
        dateRange: '1950-2099',
        place: this.place,
        model: this.model,
        scenario: scenario,
      })

      let yAxisLabel = 'Precipitation (' + units + ')'
      let layout = getLayout(title, yAxisLabel)

      let footerLines = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Massa vitae tortor condimentum lacinia quis.',
      ]

      let footer = getFooter(footerLines, layout)
      layout.annotations.push(footer)

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot('hydrology-chart', dataTraces, layout, plotSettings)
    },
  },
}
</script>
