<template>
  <div class="permafrost-chart-wrapper">
    <div id="permafrost-magt-chart" />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import traceLabels_lu from './luts'

export default {
  name: 'ReportMagtChart',
  mounted() {
    this.renderPlot()
  },
  computed: {
    ...mapGetters({
      units: 'units',
      magtData: 'permafrost/magt',
    }),
  },
  watch: {
    magtData: function () {
      this.renderPlot()
    },
    units: function () {
      this.renderPlot()
    },
  },
  methods: {
    renderPlot: function () {
      let magtData = this.magtData
      if (!magtData) {
        return
      }

      let data_traces = []
      let units = this.units == 'metric' ? 'ºC' : 'ºF'
      let freezing = this.units == 'metric' ? 0 : 32
      let uncertaintyOffset = this.units == 'metric' ? 1 : 1.8

      let eras_lu = {
        1995: '1995',
        2025: '2011-2040',
        2050: '2036-2065',
        2075: '2061–2090',
        2095: '2086–2100',
      }

      let years = Object.keys(eras_lu)
      let eras = Object.values(eras_lu)
      let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
      let scenarios = ['rcp45', 'rcp85']

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

      let allYears = Object.keys(magtData)
      let historicalYear = allYears.slice(0, 1)
      let projectedYears = allYears.slice(1)

      let historicY = Array(years.length).fill(null)
      let historicValue = magtData[historicalYear]
      historicY[0] = historicValue
      let historicalTrace = {
        type: 'scatter',
        mode: 'markers',
        name: 'Historical',
        hoverinfo: 'x+y+z+text',
        hovertemplate: '%{y}' + units,
        marker: {
          symbol: 'diamond',
          size: 8,
          color: '#888888',
        },
        x: eras,
        y: historicY,
      }

      data_traces.push(historicalTrace)

      models.forEach(model => {
        scatterTraces[model] = {}
        scenarios.forEach(scenario => {
          scatterTraces[model][scenario] = {
            type: 'scatter',
            mode: 'markers',
            name: traceLabels_lu[model][scenario],
            hoverinfo: 'x+y+z+text',
            hovertemplate:
              '%{y}' + units + ' <b>(%{customdata}' + units + ')</b>',
            marker: {
              symbol: Array(eras.length).fill(symbols[model]),
              size: 8,
              color: colors[model][scenario],
            },
            x: eras,
            y: [null],
            customdata: [null],
          }
        })
      })

      models.forEach(model => {
        scenarios.forEach(scenario => {
          projectedYears.forEach(year => {
            let value = magtData[year][model][scenario]
            scatterTraces[model][scenario]['y'].push(value)
            let diff = value - historicValue
            if (diff > 0) {
              diff = '+' + diff.toFixed(1)
            } else {
              diff = diff.toFixed(1)
            }
            scatterTraces[model][scenario]['customdata'].push(diff)
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
            text: 'Temperature (' + units + ')',
            font: {
              size: 18,
            },
          },
          hoverformat: hoverformat,
        },
        title: {
          text: 'Mean annual ground temperature',
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
        showlegend: true,
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

      if (magtData[historicalYear]) {
        layout.shapes.push({
          type: 'rect',
          x0: 0,
          x1: 1,
          xref: 'paper',
          y0: freezing - uncertaintyOffset,
          y1: freezing + uncertaintyOffset,
          yref: 'y',
          line: {
            width: 0,
          },
          fillcolor: '#cccccc',
          opacity: 0.2,
        })

        layout.shapes.push({
          type: 'line',
          x0: 0,
          x1: 1,
          xref: 'paper',
          y0: magtData[historicalYear],
          y1: magtData[historicalYear],
          yref: 'y',
          line: {
            width: 2,
          },
          fillcolor: '#cccccc',
          opacity: 0.2,
        })
      }

      let footerLines = [
        'Projected values are taken from GIPL 2.0 model output.',
        'Historical value is taken from the CRU TS 3.1 dataset.',
        'The shaded gray region is the uncertainty threshold.',
      ]

      let footerOffset = 0.05 * footerLines.length
      let footerY = -0.2 - footerOffset
      let yAxisAnnotationX = -0.04
      if (window.innerWidth < 1250) {
        layout['xaxis'] = {
          tickangle: 45,
        }
        layout['margin']['b'] = 160
        footerY = -0.4 - footerOffset
        yAxisAnnotationX = -0.06
      }

      layout.annotations.push({
        x: 0.5,
        y: footerY,
        xref: 'paper',
        yref: 'paper',
        showarrow: false,
        text: footerLines.join('<br />'),
      })

      this.$Plotly.newPlot('permafrost-magt-chart', data_traces, layout, {
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
