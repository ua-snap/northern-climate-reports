<template>
	<div class="permafrost-chart-wrapper">
		<div id="permafrost-alt-freeze-chart" />
	</div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
	name: 'ReportAltFreezeChart',
	mounted() {
		this.renderPlot()
	},
	computed: {
		...mapGetters({
			units: 'units',
			altFreezeData: 'permafrost/altFreeze',
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
				1995: '1995',
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
				ipslcm5alr: 'pentagon',
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

			let allYears = Object.keys(altFreezeData)
			let historicalYear = allYears.slice(0, 1)
			let projectedYears = allYears.slice(1)

			let historicValue = altFreezeData[historicalYear]
			if (historicValue != null) {
				let historicY = Array(years.length).fill(null)
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
						y: [null],
					}

					let dataFound = false
					projectedYears.forEach(year => {
						let value = altFreezeData[year][model][scenario]
						if (value != null) dataFound = true
						scatterTraces[model][scenario]['y'].push(
							altFreezeData[year][model][scenario]
						)
					})
					if (dataFound) {
						data_traces.push(scatterTraces[model][scenario])
					}
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
						standoff: 30,
					},
					hoverformat: hoverformat,
				},
				title: {
					text: 'Ground freeze depth',
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

			let footerLines = []
			footerLines.push('Projected values are taken from GIPL 2.0 model output.')

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

				footerLines.push(
					'Historical value is taken from the CRU TS 3.1 dataset'
				)
			}

			// Determine if any of the chart columns are missing data.
			let emptyColumn = false
			allYears.forEach(year => {
				let dataFound = _.findDeep(
					altFreezeData[year],
					(value, key, parent) => {
						if (value != null) return true
					}
				)
				if (dataFound == undefined) {
					emptyColumn = true
				}
			})

			if (emptyColumn) {
				footerLines.push(
					'Empty columns indicate that permafrost is still present for all models.'
				)
			}

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
				x: yAxisAnnotationX,
				y: 0.1,
				xref: 'paper',
				yref: 'paper',
				showarrow: true,
				text: 'Deeper freeze →',
				textangle: '-90',
				font: {
					size: 13,
				},
			})

			layout.annotations.push({
				x: 0.5,
				y: footerY,
				xref: 'paper',
				yref: 'paper',
				showarrow: false,
				text: footerLines.join('<br />'),
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
