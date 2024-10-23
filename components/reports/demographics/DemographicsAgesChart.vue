<template>
  <div class="block">
    <div class="content is-size-5">
      Information in this section is computed from the U.S. Census DHC Year
      2020. Data are shown both as a graphic, and a table, below.
    </div>
    <div id="demographics-ages-chart" />
    <div class="block">
      <table class="table mt-6">
        <caption>
          Age, by category,
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
        <tbody>
          <tr v-for="(age, key) in ages">
            <th scope="row">{{ age }}</th>
            <td>{{ ageByCategory[key]['place'] }}%</td>
            <td>{{ ageByCategory[key]['alaska'] }}%</td>
            <td>{{ ageByCategory[key]['us'] }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
  data() {
    return {
      ages: {
        pct_under_5: 'under 5',
        pct_5_to_17: '5-17',
        pct_18_to_64: '18-64',
        pct_65_plus: 'over 65',
      },
    }
  },
  computed: {
    ageByCategory() {
      var abc = {}
      Object.keys(this.ages).forEach(key => {
        abc[key] = {}

        _.forEach(['place', 'alaska', 'us'], demo => {
          switch (key) {
            case 'pct_under_5':
              abc[key][demo] = this.demographics[demo]['pct_under_5']
              break

            case 'pct_5_to_17':
              abc[key][demo] = Number(
                this.demographics[demo]['pct_under_18'] -
                  this.demographics[demo]['pct_under_5']
              ).toPrecision(4)
              break

            case 'pct_18_to_64':
              abc[key][demo] = Number(
                100 -
                  this.demographics[demo]['pct_65_plus'] -
                  this.demographics[demo]['pct_under_18']
              ).toPrecision(4)
              break

            case 'pct_65_plus':
              abc[key][demo] = this.demographics[demo]['pct_65_plus']
              break

            default:
              break
          }
        })
      })
      return abc
    },
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

      var trace0 = {
        x: [
          demographics['us']['pct_under_5'],
          demographics['alaska']['pct_under_5'],
          demographics['place']['pct_under_5'],
        ],
        y: yaxis,
        name: 'under 5',
        orientation: 'h',
        type: 'bar',
        marker: {
          color: '#f1eef6',
        },
        text: [
          demographics['us']['pct_under_5'] + '%',
          demographics['alaska']['pct_under_5'] + '%',
          demographics['place']['pct_under_5'] + '%',
        ],
        textposition: 'auto',
        textfont: {
          weight: 'bold',
          size: 14,
        },
        hoverinfo: 'none',
      }

      // Compute 5-17
      let betweens = {}
      let keys = ['us', 'alaska', 'place']
      keys.forEach(key => {
        betweens[key] = Number(
          (
            demographics[key]['pct_under_18'] - demographics[key]['pct_under_5']
          ).toPrecision(4)
        )
      })

      var trace1 = {
        height: 5,
        x: [betweens['us'], betweens['alaska'], betweens['place']],
        y: yaxis,
        name: '5-17',
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
          color: '#bdc9e1',
        },
        hoverinfo: 'none',
      }

      // Compute 18-64
      betweens = {}
      // keys defined above
      keys.forEach(key => {
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
          color: '#74a9cf',
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
          color: '#0570b0',
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

      var dataTraces = [trace0, trace1, trace2, trace3]

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
        width: 1200,
        legend: {
          orientation: 'h',
          traceorder: 'normal',
          font: {
            size: 16,
          },
        },
        xaxis: {
          fixedrange: true,
          zeroline: false,
          visible: false,
        },
        yaxis: {
          fixedrange: true,
          zeroline: false,
          tickfont: {
            size: 16,
          },
          ticksuffix: '  ', // spacing
        },
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
