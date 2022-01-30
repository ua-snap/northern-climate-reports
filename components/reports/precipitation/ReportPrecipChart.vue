<template>
	<div class="precip-chart-wrapper">
		<div id="precip-chart" />
	</div>
</template>
<style lang="scss" scoped>
.precip-chart-wrapper {
	padding-bottom: 0rem;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
	name: 'ReportPrecipChart',
	props: ['season'],
	mounted() {
		this.renderPlot()
	},
	computed: {
		...mapGetters({
			units: 'units',
			reportData: 'climate/climateData',
		}),
	},
	watch: {
		reportData: function () {
			this.renderPlot()
		},
		season: function () {
			this.renderPlot()
		},
	},
	methods: {
		renderPlot: function () {
			let reportData = this.reportData
			if (!reportData) {
				return
			}

			let data_traces = []
			let units = this.units == 'metric' ? 'mm' : 'in'

			let season_lu = {
				DJF: 'December - February',
				MAM: 'March - May',
				JJA: 'June - August',
				SON: 'September - November',
			}

			let decade_keys = Object.keys(this.reportData)
			decade_keys = decade_keys.filter((value) => {
				if (value !== '2040_2069' && value !== '2070_2099') {
					return value
				}
			})
			let decades = decade_keys.map((x) => x.replace('_', '-'))

			let historical = {
				type: 'box',
				name: 'Historical (1950-2009)',
				x: decades.slice(0, 1),
				q1: [],
				median: [],
				q3: [],
				lowerfence: [],
				upperfence: [],
				marker: {
					color: '#888888',
				},
				fillcolor: '#cccccc',
				hoverinfo: 'skip',
			}

			let models = ['5modelAvg', 'MRI-CGCM3', 'CCSM4']
			let scenarios = ['rcp45', 'rcp60', 'rcp85']

			let traceLabels_lu = {
				'5modelAvg': {
					rcp45: 'RCP 4.5 (5-model Avg.)',
					rcp60: 'RCP 6.0 (5-model Avg.)',
					rcp85: 'RCP 8.5 (5-model Avg.)',
				},
				'MRI-CGCM3': {
					rcp45: 'RCP 4.5 (MRI)',
					rcp60: 'RCP 6.0 (MRI)',
					rcp85: 'RCP 8.5 (MRI)',
				},
				CCSM4: {
					rcp45: 'RCP 4.5 (NCAR)',
					rcp60: 'RCP 6.0 (NCAR)',
					rcp85: 'RCP 8.5 (NCAR)',
				},
			}

			let scatterTraces = {}

			let symbols = {
				'5modelAvg': 'circle',
				'MRI-CGCM3': 'square',
				CCSM4: 'diamond',
			}

			let colors = {
				'5modelAvg': {
					rcp45: 'rgb(230, 150, 150)',
					rcp60: 'rgb(210, 90, 90)',
					rcp85: 'rgb(190, 30, 30)',
				},
				'MRI-CGCM3': {
					rcp45: 'rgb(150, 150, 230)',
					rcp60: 'rgb(90, 90, 210)',
					rcp85: 'rgb(30, 30, 190)',
				},
				CCSM4: {
					rcp45: 'rgb(210, 210, 150)',
					rcp60: 'rgb(180, 180, 90)',
					rcp85: 'rgb(140, 140, 30)',
				},
			}

			models.forEach((model) => {
				scatterTraces[model] = {}
				scenarios.forEach((scenario) => {
					scatterTraces[model][scenario] = {
						type: 'scatter',
						mode: 'markers',
						name: traceLabels_lu[model][scenario],
						hoverinfo: 'x+y+z+text',
						hovertemplate:
							'%{y}' + units + ' <b>(%{customdata}' + units + ')</b>',
						marker: {
							symbol: Array(decades.length).fill(symbols[model]),
							size: 8,
							color: colors[model][scenario],
						},
						x: decades.slice(1),
						y: [],
						customdata: [],
					}
				})
			})

			decade_keys.forEach((decade) => {
				if (decade === '2040_2069' || decade === '2070_2099') {
					return
				}

				if (decade === '1950_2009') {
					let prData = this.reportData[decade][this.season]['CRU-TS40'][
						'CRU_historical'
					]['pr']
					historical['median'].push(prData['median'])
					historical['q1'].push(prData['q1'])
					historical['q3'].push(prData['q3'])
					historical['lowerfence'].push(prData['min'])
					historical['upperfence'].push(prData['max'])
				} else {
					models.forEach((model) => {
						scenarios.forEach((scenario) => {
							let scenarioPr = this.reportData[decade][this.season][model][
								scenario
							]['pr']
							let historicalPr = this.reportData['1950_2009'][this.season][
								'CRU-TS40'
							]['CRU_historical']['pr']['median']
							let prDiff = scenarioPr - historicalPr
							let precision = this.units == 'metric' ? 0 : 1
							if (prDiff > 0) {
								prDiff = '+' + prDiff.toFixed(precision)
							} else {
								prDiff = prDiff.toFixed(precision)
							}
							scatterTraces[model][scenario]['y'].push(scenarioPr)
							scatterTraces[model][scenario]['customdata'].push(prDiff)
						})
					})
				}
			})

			data_traces.push(historical)

			models.forEach((model) => {
				scenarios.forEach((scenario) => {
					data_traces.push(scatterTraces[model][scenario])
				})
			})

			let hoverformat = this.units == 'metric' ? '.0f' : '.1f'
			let layout = {
				boxmode: 'group',
				yaxis: {
					title: {
						text: 'Precipitation (' + units + ')',
						font: {
							size: 18,
						},
					},
					hoverformat: hoverformat,
				},
				title: {
					text:
						'Historical and projected precipitation (' +
						season_lu[this.season] +
						')',
					font: {
						size: 24,
					},
				},
				shapes: [
					{
						type: 'rect',
						x0: 0,
						x1: 1,
						xref: 'paper',
						y0: this.reportData['1950_2009'][this.season]['CRU-TS40'][
							'CRU_historical'
						]['pr']['q1'],
						y1: this.reportData['1950_2009'][this.season]['CRU-TS40'][
							'CRU_historical'
						]['pr']['q3'],
						yref: 'y',
						line: {
							width: 0,
						},
						fillcolor: '#cccccc',
						opacity: 0.2,
					},
				],
				hovermode: 'x unified',
				annotations: [],
				legend: {
					x: 1.03,
				},
				margin: {
					b: 120,
				},
				height: 500,
				dragmode: false,
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
				text:
					'The boxplot represents the interquartile range (IQR) of ' +
					'historical means for the season, from 1950-2009.<br />The shaded ' +
					'gray region shows the extent of common variation for the ' +
					'historical period.<br />The line inside the boxplot represents ' +
					'the median historical precipitation.',
			})

			this.$Plotly.newPlot('precip-chart', data_traces, layout, {
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
