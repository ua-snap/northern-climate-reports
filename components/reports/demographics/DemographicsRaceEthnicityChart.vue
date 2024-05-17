<template>
  <div id="demographics-race-ethnicity-chart" />
</template>

<style lang="scss" scoped></style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings } from '~/utils/charts'
import { formatting } from '~/mixins/formatting'

export default {
  mixins: [formatting],
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      demographics: 'demographics/demographicsData',
      placeName: 'place/name',
    }),
  },
  watch: {
    demographics: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let demographics = this.demographics
      if (!demographics) {
        return
      }

      let place = this.wordwrap(this.placeName, 20).replace('\n', '  <br>')

      let yaxis = ['U.S.', 'Alaska', place]

      let races = {
        pct_hispanic_latino: 'Hispanic / Latino',
        pct_white: 'White',
        pct_african_american: 'African American',
        pct_amer_indian_ak_native: 'American Indian / Alaska Native',
        pct_asian: 'Asian',
        pct_hawaiian_pacislander: 'Hawaiian / Pacific Islander',
        pct_other: 'Other',
        pct_multi: 'Multiracial',
      }

      let traces = []
      
        Object.keys(races).forEach(race => {
          let trace = {
            x: [
              demographics['us'][race],
              demographics['alaska'][race],
              demographics['place'][race]
            ],
            y: yaxis,
            name: races[race],
            orientation: 'h',
            type: 'bar',
            text: [
              demographics['us'][race] + '%',
              demographics['alaska'][race] + '%',
              demographics['place'][race] + '%',
            ],
            textposition: 'auto',
            textfont: {
              weight: 'bold',
              size: 14,
            },
            hoverinfo: 'none',
          }
          traces.push(trace)
        
      })

      var layout = {
        title: 'Race & Ethnicity, ' + place,

        margin: {
          t: 40,
          r: 40,
          b: 0,
          l: 200,
        },
        height: 1000,
        width: 1000,
        legend: {
          orientation: 'h',
          traceorder: 'normal',
          font: {
            size: 16,
          },
        },
        yaxis: {
          fixedrange: true,
          zeroline: false,
          tickfont: {
            size: 16,
          },
          ticksuffix: '  ', // spacing
        },
        xaxis: { fixedrange: true, zeroline: false },
      }

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'demographics-race-ethnicity-chart',
        traces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
