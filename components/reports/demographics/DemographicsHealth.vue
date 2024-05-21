<template>
  <div>
    <div id="demographics-race-ethnicity-chart" />
    <div class="block">
      <div id="demographics-race-ethnicity-chart" />
      <table class="table mt-6">
        <caption>
          Race and ethnicity,
          {{
            placeName
          }}
        </caption>
        <thead>
          <tr>
            <th></th>
            <th scope="col">{{ placeName }}</th>
            <th scope="col">Alaska</th>
            <th scope="col">U.S.</th>
          </tr>
        </thead>

        <tr v-for="(race, key) in races">
          <th scope="row">{{ race }}</th>
          <td>{{ demographics['place'][key] }}%</td>
          <td>{{ demographics['alaska'][key] }}%</td>
          <td>{{ demographics['us'][key] }}%</td>
        </tr>
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
  data() {
    return {
      races: {
        pct_hispanic_latino: 'Hispanic / Latino',
        pct_white: 'White',
        pct_african_american: 'African American',
        pct_amer_indian_ak_native: 'American Indian / Alaska Native',
        pct_asian: 'Asian',
        pct_hawaiian_pacislander: 'Hawaiian / Pacific Islander',
        pct_other: 'Other',
        pct_multi: 'Multiracial',
      },
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

      Object.keys(placeMap).forEach(key => {
        let trace = {
          x: [
            demographics[key]['pct_hispanic_latino'],
            demographics[key]['pct_white'],
            demographics[key]['pct_african_american'],
            demographics[key]['pct_amer_indian_ak_native'],
            demographics[key]['pct_asian'],
            demographics[key]['pct_hawaiian_pacislander'],
            demographics[key]['pct_other'],
            demographics[key]['pct_multi'],
          ].reverse(),
          y: Object.values(this.races)
            .map(race => {
              return this.wordwrap(race, 10).replace('\n', ' <br>')
            })
            .reverse(),
          name: placeMap[key],
          orientation: 'h',
          type: 'bar',
          hoverinfo: 'none',
        }
        traces.unshift(trace)
      })
      traces[1].marker = { color: '#a6cee3' }
      traces[0].marker = { color: '#1f78b4' }
      traces[2].marker = { color: '#b2df8a' }

      let layout = {
        title: 'Race & Ethnicity, ' + place,
        barmode: 'group',
        margin: {
          t: 40,
          r: 40,
          b: 0,
          l: 200,
        },
        height: 800,
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
