<template>
  <div>
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
    <hr />
    <br>
    <br>
    <br>
    <br>
    <br>
    <div id="demographics-race-ethnicity-chart2" />
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

      let yaxis = ['U.S.', 'Alaska', place]


      /// plot2

      traces = []
      let placeMap = {
        place: place,
        alaska: 'Alaska',
        us: 'U.S.',
      }
      Object.keys(placeMap).forEach(key => {
        let trace = {
          y: [
            demographics[key]['pct_hispanic_latino'],
            demographics[key]['pct_white'],
            demographics[key]['pct_african_american'],
            demographics[key]['pct_amer_indian_ak_native'],
            demographics[key]['pct_asian'],
            demographics[key]['pct_hawaiian_pacislander'],
            demographics[key]['pct_other'],
            demographics[key]['pct_multi'],
          ],
          x: Object.values(races),
          name: placeMap[key],
          // orientation: 'h',
          type: 'bar',
          // text: [
          //   demographics['us'][race] + '%',
          //   demographics['alaska'][race] + '%',
          //   demographics['place'][race] + '%',
          // ],
          // textposition: 'auto',
          // textfont: {
          //   weight: 'bold',
          //   size: 14,
          // },
          hoverinfo: 'none',
        }
        traces.push(trace)
      })

      layout = {
        title: 'Race & Ethnicity, ' + place,
        barmode: 'group',
        margin: {
          t: 40,
          r: 40,
          b: 0,
          l: 200,
        },
        height: 350,
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

      this.$Plotly.newPlot(
        'demographics-race-ethnicity-chart2',
        traces,
        layout,
        plotSettings
      )
    },
  },
}
</script>
