<template>
	<div class="temp-chart-wrapper">
		<div id="temp-chart" />
	</div>
</template>
<style lang="scss" scoped>
.temp-chart-wrapper {
	padding-bottom: 0rem;
}
</style>
<script>
import _ from 'lodash'
export default {
	name: 'ReportTempChart',
	props: ['reportData', 'units', 'season'],
	mounted() {
		this.renderPlot()
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
			let units = this.units == 'metric' ? 'ºC' : 'ºF'

			let season_lu = {
				'DJF': 'December - February',
				'MAM': 'March - May',
				'JJA': 'June - August',
				'SON': 'September - November',
			}

			let decade_keys = Object.keys(this.reportData)
			decade_keys = decade_keys.filter(value => {
				if (value !== '2040_2069' && value !== '2070_2099') {
					return value
				}
			})
			let decades = decade_keys.map(x => x.replace('_', '-'))

			let historical = {
				type: 'box',
				name: 'Historical',
				x: decades.slice(0, 1),
				q1: [],
				median: [],
				q3: [],
				lowerfence: [],
				upperfence: [],
			}

			let models = ['5modelAvg', 'MRI-CGCM3', 'CCSM4']
			let scenarios = ['rcp45', 'rcp60', 'rcp85']

			let traceLabels_lu = {
				'5modelAvg': {
					'rcp45': 'RCP 4.5 (5 Model Avg.)',
					'rcp60': 'RCP 6.0 (5 Model Avg.)',
					'rcp85': 'RCP 8.5 (5 Model Avg.)',
				},
				'MRI-CGCM3': {
					'rcp45': 'RCP 4.5 (MRI)',
					'rcp60': 'RCP 6.0 (MRI)',
					'rcp85': 'RCP 8.5 (MRI)',
				},
				'CCSM4': {
					'rcp45': 'RCP 4.5 (NCAR)',
					'rcp60': 'RCP 6.0 (NCAR)',
					'rcp85': 'RCP 8.5 (NCAR)',
				},
			}

			let scatterTraces = {}
			models.forEach(model => {
				scatterTraces[model] = {}
				scenarios.forEach(scenario => {
					scatterTraces[model][scenario] = {
						type: 'scatter',
						mode: 'markers',
						name: traceLabels_lu[model][scenario],
						text: traceLabels_lu[model][scenario],
						hoverinfo: 'x+y+z+text',
						x: decades.slice(1),
						y: [],
					}
				})
			})

			decade_keys.forEach(decade => {
				if (decade === '2040_2070' || decade === '2070_2100') {
					return
				}

				if (decade === '1950_2009') {
					let tasData = this.reportData[decade][this.season]['CRU-TS40']['CRU_historical']['tas']
					historical['median'].push(tasData['median'])
					historical['q1'].push(tasData['q1'])
					historical['q3'].push(tasData['q3'])
					historical['lowerfence'].push(tasData['min'])
					historical['upperfence'].push(tasData['max'])
				} else {
					models.forEach(model => {
						scenarios.forEach(scenario => {
							scatterTraces[model][scenario]['y'].push(this.reportData[decade][this.season][model][scenario]['tas'])
						})
					})
				}
			})

			data_traces.push(historical)

			models.forEach(model => {
				scenarios.forEach(scenario => {
					data_traces.push(scatterTraces[model][scenario])
				})
			})

			var layout = {
				boxmode: 'group',
				yaxis: {
					title: {
						text: 'Temperature ' + units,
						font: {
							size: 18,
						},
					},
				},
				title: {
					text: 'Historical and projected temperature (' + season_lu[this.season] + ')',
					font: {
						size: 24,
					},
				},
			}

			this.$Plotly.newPlot('temp-chart', data_traces, layout, {
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
