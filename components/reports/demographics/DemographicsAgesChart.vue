<template>
  <div id="demographics-ages-chart" />
</template>

<style lang="scss" scoped></style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings } from '~/utils/charts'

export default {
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      demographics: 'demographics/demographicsData',
      placeName: 'place/rawName',
      placeAltName: 'place/rawAltName',
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
      console.log('demos', demographics)

      let place = ''
      if(this.placeAltName) {
        place = this.placeName + ' <br>(' + this.placeAltName + ') '
      } else {
        place = this.placeName + ' '
      }

      let yaxis = ['U.S. ', 'Alaska ', place]

      var trace1 = {
        x: [
          demographics['us']['pct_under_18'],
          demographics['alaska']['pct_under_18'],
          demographics['place']['pct_under_18'],
        ],
        y: yaxis,
        name: 'under 18',
        orientation: 'h',
        type: 'bar',
        marker: {
          color: '#bdd7e7',
        },
        text: [
          demographics['us']['pct_under_18'] + '%',
          demographics['alaska']['pct_under_18'] + '%',
          demographics['place']['pct_under_18'] + '%',
        ],
        textposition: 'auto',
        textfont: {
          weight: 'bold',
          size: 14,
        },
        hoverinfo: 'none',
      }

      let betweens = {}
      let keys = ['us', 'alaska', 'place']
      keys.forEach(key => {
        console.log('???', demographics[key]['pct_under_18'])
        betweens[key] = Number(
          (
            100 -
            demographics[key]['pct_under_18'] -
            demographics[key]['pct_65_plus']
          ).toPrecision(4)
        )
      })

      var trace2 = {
        height: 5,
        x: [betweens['us'], betweens['alaska'], betweens['place']],
        y: yaxis,
        name: '18-64',
        orientation: 'h',
        type: 'bar',
        text: [
          betweens['us'] + '%',
          betweens['alaska'] + '%',
          betweens['place'] + '%',
        ],
        textposition: 'auto',
        textfont: {
          size: 14,
        },
        marker: {
          color: '#6baed6',
        },
        hoverinfo: 'none',
      }

      var trace3 = {
        x: [
          demographics['us']['pct_65_plus'],
          demographics['alaska']['pct_65_plus'],
          demographics['place']['pct_65_plus'],
        ],
        y: yaxis,
        name: '65 or older',
        orientation: 'h',
        type: 'bar',
        marker: {
          color: '#045a8d',
        },
        text: [
          demographics['us']['pct_65_plus'] + '%',
          demographics['alaska']['pct_65_plus'] + '%',
          demographics['place']['pct_65_plus'] + '%',
        ],
        textposition: 'auto',
        textfont: {
          size: 14,
        },
        hoverinfo: 'none',
      }

      var dataTraces = [trace1, trace2, trace3]

      var layout = {
        title: 'Age, by category',
        barmode: 'stack',

        margin: {
          t: 40,
          r: 40,
          b: 0,
          l: 200,
        },
        height: 250,
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
        },
        xaxis: { fixedrange: true, zeroline: false },
      }

      let plotSettings = getPlotSettings()
      this.$Plotly.newPlot(
        'demographics-ages-chart',
        dataTraces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
