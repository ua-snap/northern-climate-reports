<template>
  <div class="permafrost-chart-wrapper">
    <div id="permafrost-alt-freeze-chart" />
  </div>
</template>
<style lang="scss" scoped>
.permafrost-chart-wrapper {
  padding-bottom: 0rem;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportAltFreezeChart',
  props: ['altFreezeData'],
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
    }),
  },
  watch: {
    altFreezeData: function () {
      this.renderPlot()
    },
    units: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let altFreezeData = this.altFreezeData
      if (!altFreezeData) {
        return
      }

      let data_traces = []
      let units = this.units == 'metric' ? 'm' : 'in'

      let eras_lu = {
        2025: '2011 - 2040',
        2050: '2036 - 2065',
        2075: '2061 – 2090',
        2095: '2086 – 2100',
      }

      let years = Object.keys(eras_lu)
      let eras = Object.values(eras_lu)
      let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
      let scenarios = ['rcp45', 'rcp85']

      let traceLabels_lu = {
        gfdlcm3: {
          rcp45: 'RCP 4.5 (gfdlcm3)',
          rcp85: 'RCP 8.5 (gfdlcm3)',
        },
        gisse2r: {
          rcp45: 'RCP 4.5 (gisse2r)',
          rcp85: 'RCP 8.5 (gisse2r)',
        },
        ipslcm5alr: {
          rcp45: 'RCP 4.5 (ipslcm5alr)',
          rcp85: 'RCP 8.5 (ipslcm5alr)',
        },
        mricgcm3: {
          rcp45: 'RCP 4.5 (mricgcm3)',
          rcp85: 'RCP 8.5 (mricgcm3)',
        },
        ncarccsm4: {
          rcp45: 'RCP 4.5 (ncarccsm4)',
          rcp85: 'RCP 8.5 (ncarccsm4)',
        },
      }

      let scatterTraces = {}

      let symbols = {
        gfdlcm3: 'circle',
        gisse2r: 'square',
        ipslcm5alr: 'diamond',
        mricgcm3: 'cross',
        ncarccsm4: 'x',
      }

      let colors = {
        gfdlcm3: {
          rcp45: 'rgb(230, 150, 150)',
          rcp85: 'rgb(190, 30, 30)',
        },
        gisse2r: {
          rcp45: 'rgb(150, 150, 230)',
          rcp85: 'rgb(30, 30, 190)',
        },
        ipslcm5alr: {
          rcp45: 'rgb(210, 210, 150)',
          rcp85: 'rgb(140, 140, 30)',
        },
        mricgcm3: {
          rcp45: 'rgb(250, 150, 30)',
          rcp85: 'rgb(210, 120, 30)',
        },
        ncarccsm4: {
          rcp45: 'rgb(210, 150, 210)',
          rcp85: 'rgb(140, 30, 140)',
        },
      }

      models.forEach(model => {
        scatterTraces[model] = {}
        scenarios.forEach(scenario => {
          scatterTraces[model][scenario] = {
            type: 'scatter',
            mode: 'markers',
            name: traceLabels_lu[model][scenario],
            hoverinfo: 'x+y+z+text',
            hovertemplate: '%{y}' + units,
            marker: {
              symbol: Array(eras.length).fill(symbols[model]),
              size: 8,
              color: colors[model][scenario],
            },
            x: eras,
            y: [],
          }
        })
      })

      let historicalYear = Object.keys(altFreezeData).slice(0, 1)
      let projectedYears = Object.keys(altFreezeData).slice(1)
      models.forEach(model => {
        scenarios.forEach(scenario => {
          projectedYears.forEach(year => {
            scatterTraces[model][scenario]['y'].push(
              altFreezeData[year][model][scenario]
            )
          })
        })
      })

      models.forEach(model => {
        scenarios.forEach(scenario => {
          data_traces.push(scatterTraces[model][scenario])
        })
      })

      let hoverformat = '.1f'
      let layout = {
        boxmode: 'group',
        yaxis: {
          title: {
            text: 'Depth (' + units + ')',
            font: {
              size: 18,
            },
          },
          hoverformat: hoverformat,
        },
        title: {
          text: 'Projected ground freeze depth',
          font: {
            size: 24,
          },
        },
        shapes: [],
        hovermode: 'x unified',
        hoverlabel: {
          namelength: -1,
        },
        annotations: [],
        legend: {
          x: 1.03,
        },
        margin: {
          b: 40,
        },
        margin: {
          b: 120,
        },
        height: 500,
        dragmode: false,
      }

      let footerText = 'Projected values are taken from GIPL 2.0 model output.'

      if (altFreezeData[historicalYear]) {
        layout.shapes.push({
          type: 'rect',
          x0: 0,
          x1: 1,
          xref: 'paper',
          y0: altFreezeData[historicalYear],
          y1: altFreezeData[historicalYear],
          yref: 'y',
          line: {
            width: 2,
          },
          fillcolor: '#cccccc',
          opacity: 0.2,
        })

        layout.annotations.push({
          x: 1,
          y: altFreezeData[historicalYear],
          xref: 'paper',
          yref: 'y',
          text: '1995',
          showarrow: true,
          arrowcolor: '#aaaaaa',
          arrowhead: 6,
          ax: 0,
          ay: -12,
          font: {
            color: '#888888',
          },
        })

        footerText =
          'Historical value is taken from the CRU TS 3.1 dataset.' +
          '<br />' +
          footerText
      }

      let footer_y = -0.25
      if (window.innerWidth < 1250) {
        layout['xaxis'] = {
          tickangle: 45,
        }
        layout['margin']['b'] = 160
        footer_y = -0.5
      }

      layout.annotations.push({
        x: 0.5,
        y: footer_y,
        xref: 'paper',
        yref: 'paper',
        showarrow: false,
        text: footerText,
      })

      this.$Plotly.newPlot('permafrost-alt-freeze-chart', data_traces, layout, {
        displaylogo: false,
        modeBarButtonsToRemove: [
          'zoom2d',
          'pan2d',
          'select2d',
          'lasso2d',
          'zoomIn2d',
          'zoomOut2d',
          'autoScale2d',
          'resetScale2d',
        ],
      })
    },
  },
}
</script>
