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
export default {
	name: 'ReportPrecipChart',
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
			let units = this.units == 'metric' ? 'mm' : 'in'

			let season_lu = {
				'DJF': 'December - February',
				'MAM': 'March - May',
				'JJA': 'June - August',
				'SON': 'September - November',
			}

			let decade_keys = Object.keys(this.reportData)
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

			let models = ['MRI-CGCM3', 'CCSM4']
			let scenarios = ['rcp45', 'rcp85']

			let traceLabels_lu = {
				'MRI-CGCM3': {
					'rcp45': 'RCP 4.5 (MRI)',
					'rcp85': 'RCP 8.5 (MRI)',
				},
				'CCSM4': {
					'rcp45': 'RCP 4.5 (NCAR)',
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
					let prData = this.reportData[decade][this.season]['CRU-TS40']['CRU_historical']['pr']
					historical['median'].push(prData['median'])
					historical['q1'].push(prData['q1'])
					historical['q3'].push(prData['q3'])
					historical['lowerfence'].push(prData['min'])
					historical['upperfence'].push(prData['max'])
				} else {
					models.forEach(model => {
						scenarios.forEach(scenario => {
							scatterTraces[model][scenario]['y'].push(this.reportData[decade][this.season][model][scenario]['pr'])
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

			let layout = {
				boxmode: 'group',
				yaxis: {
					title: {
						text: 'Precipitation ' + units,
						font: {
							size: 18,
						},
					},
				},
				title: {
					text: 'Historical and projected precipitation (' + season_lu[this.season] + ')',
					font: {
						size: 24,
					},
				},
			}

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
