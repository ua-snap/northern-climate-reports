<template>
  <div class="wildfire-chart-wrapper">
    <div class="is-flex">
      <b-field label="Model" class="px-3">
        <div>
          <b-radio
            v-model="veg_chart_model_selection"
            name="veg_chart_model_selection"
            native-value="NCAR-CCSM4"
            >NCAR CCSM4</b-radio
          >
        </div>
        <div>
          <b-radio
            v-model="veg_chart_model_selection"
            name="veg_chart_model_selection"
            native-value="MRI-CGCM3"
            >MRI CGCM3</b-radio
          >
        </div>
      </b-field>
    </div>
    <div id="wildfire-veg-change-chart" />
  </div>
</template>
<style lang="scss" scoped>
.wildfire-chart-wrapper {
  width: 730px;
  margin: 0 auto;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import {
  getPlotSettings,
  buildTitle,
  getLayout,
  getFooter,
} from '~/utils/charts'
export default {
  name: 'ReportVegChangeChart',
  mounted() {
    this.renderPlot()
  },
  data() {
    return {
      veg_chart_model_selection: 'NCAR-CCSM4',
      veg_scenario_selection: 'rcp85',
    }
  },
  computed: {
    ...mapGetters({
      vegEras: 'wildfire/vegEras',
      vegChangeData: 'wildfire/veg_change',
      vegTypes: 'wildfire/vegTypes',
      place: 'place/name',
      isPointLocation: 'place/isPointLocation',
      huc12Id: 'wildfire/huc12Id',
    }),
  },
  watch: {
    vegChangeData: function () {
      this.renderPlot()
    },
    veg_chart_model_selection: function () {
      this.renderPlot()
    },
    veg_scenario_selection: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let vegChangeData = this.vegChangeData
      if (!vegChangeData) {
        return
      }

      let title = buildTitle({
        dataLabel: 'Vegetation type',
        dateRange: '1950-2099',
        place: this.place,
        huc12Id: this.huc12Id,
      })

      let yAxisLabel = 'Vegetation type coverage (%)'
      let layout = getLayout(title, yAxisLabel)
      layout['barmode'] = 'stack'
      layout['xaxis']['showdividers'] = false
      layout['hovermode'] = 'closest'

      let dataTraces = []

      Object.keys(this.vegTypes).forEach(type => {
        // Don't include "not modeled" here.
        if (type == 'not_modeled') {
          return
        }

        let yValues = []
        this.vegEras.forEach(era => {
          if (era == '1950-2008') {
            yValues.push(vegChangeData[era]['MODEL-SPINUP']['historical'][type])
          } else {
            yValues.push(
              vegChangeData[era][this.veg_chart_model_selection]['rcp45'][type]
            )
            yValues.push(
              vegChangeData[era][this.veg_chart_model_selection]['rcp85'][type]
            )
          }
        })

        let trace = {
          type: 'bar',
          name: this.vegTypes[type]['label'],
          marker: {
            color: this.vegTypes[type]['color'],
          },
          hovertemplate: '<b>%{x}</b>: %{y:.2f}%',
          x: [
            
            [
              'Historical',
              'RCP 4.5',
              'RCP 8.5',
              'RCP 4.5',
              'RCP 8.5',
              'RCP 4.5',
              'RCP 8.5',
            ],
            [
              '1950-2008',
              '2010-2039',
              '2010-2039',
              '2040-2069',
              '2040-2069',
              '2070-2099',
              '2070-2099',
            ],
          ],
          y: yValues,
        }

        dataTraces.push(trace)
      })

      let footerLines = [
        'Projected and historical values are taken from ALFRESCO model output.',
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
