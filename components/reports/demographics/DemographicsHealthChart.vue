<template>
  <div>
    <div class="block">
      <h5 class="title is-5">Disability &amp; insurance</h5>
      <div id="demographics-di-chart" />
    </div>
    <div class="block">
      <h5 class="title is-5">Health conditions</h5>
      <div id="demographics-health-chart" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  margin-left: 200px;
}
</style>

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

      let traces = []
      let placeMap = {
        place: place,
        alaska: 'Alaska',
        us: 'U.S.',
      }

      //       "pct_w_disability": 11.6,
      // "moe_pct_w_disability": 1.4,
      // "pct_insured": 90.6,
      // "moe_pct_insured": 1.7,
      // "pct_uninsured": 9.4,
      // "moe_pct_uninsured": 1.7,

      let hi = ['% with disability', '% insured', '% uninsured']

      let conditions = {
        pct_asthma: 'Asthma',
        pct_copd: 'COPD',
        pct_hd: 'Heart disease',
        pct_stroke: 'Stroke',
        pct_diabetes: 'Diabetes',
        pct_kd: 'Kidney disease',
      }

      Object.keys(placeMap).forEach(key => {
        let xaxis = [
          demographics[key]['pct_w_disability'],
          demographics[key]['pct_insured'],
          demographics[key]['pct_uninsured'],
        ].reverse()
        let trace = {
          x: xaxis,
          y: hi
            .map(e => {
              return this.wordwrap(e, 20).replace('\n', ' <br>')
            })
            .reverse(),
          name: placeMap[key],
          orientation: 'h',
          type: 'bar',
          text: xaxis.map(String),
          hoverinfo: 'none',
        }
        traces.unshift(trace)
      })
      traces[1].marker = { color: '#a6cee3' }
      traces[0].marker = { color: '#1f78b4' }
      traces[2].marker = { color: '#b2df8a' }

      let layout = {
        title: 'Disability & insurance, ' + place,
        barmode: 'group',
        margin: {
          t: 40,
          r: 40,
          b: 0,
          l: 200,
        },
        height: 500,
        width: 1000,
        legend: {
          orientation: 'h',
          traceorder: 'reversed',
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
        'demographics-di-chart',
        traces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
