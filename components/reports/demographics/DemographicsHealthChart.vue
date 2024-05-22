<template>
  <div>
    <div class="block">
      <h5 class="title is-5">Disability &amp; insurance</h5>
      <div class="content is-size-5">
        <p>
          Downloadable spreadsheet below includes margin of error for these
          statistics.
        </p>
      </div>
      <div id="demographics-di-chart" />
    </div>
    <div class="block">
      <h5 class="title is-5">Health conditions</h5>
      
      <table class="table">
        <caption>Health conditions</caption>
        <thead>
          <th scope="col">Condition</th>
          <th scope="col">{{ placeName }}</th>
        </thead>
        <tbody>
          <tr v-for="(conditionName, key) in conditions">
            <th scope="row">{{ conditionName }}</th>
            <td>{{ demographics['place'][key] }}%</td>
          </tr>
        </tbody>
      </table>
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
  data () {
    return {
      conditions: {
        pct_asthma: 'Asthma',
        pct_copd: 'COPD',
        pct_hd: 'Heart disease',
        pct_stroke: 'Stroke',
        pct_diabetes: 'Diabetes',
        pct_kd: 'Kidney disease',
      }
    }
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
      let hi = ['% with disability', '% insured', '% uninsured']

      

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
        height: 400,
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
