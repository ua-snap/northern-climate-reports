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
	props: ['reportData', 'chartData', 'units', 'season'],
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

			let decade_keys = Object.keys(this.chartData)
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

			let rcp45 = {
				type: 'scatter',
				mode: 'markers',
				name: 'RCP 4.5',
				x: decades.slice(1),
				y: [],
			}

			let rcp85 = {
				type: 'scatter',
				mode: 'markers',
				name: 'RCP 8.5',
				x: decades.slice(1),
				y: [],
			}

			decade_keys.forEach(decade => {
				if (decade === '1950_2009') {
					let tasData = this.chartData[decade][this.season]['CRU-TS40']['CRU_historical']['tas']
					historical['median'].push(tasData['mean'])
					historical['q1'].push(tasData['lo_std'])
					historical['q3'].push(tasData['hi_std'])
					historical['lowerfence'].push(tasData['min'])
					historical['upperfence'].push(tasData['max'])
				} else {
					let rcp45_mean = this.chartData[decade][this.season]['5modelAvg']['rcp45']['tas']
					let rcp85_mean = this.chartData[decade][this.season]['5modelAvg']['rcp85']['tas']
					rcp45['y'].push(rcp45_mean)
					rcp85['y'].push(rcp85_mean)
				}
			})

			data_traces.push(historical, rcp45, rcp85)

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
					text: 'Historical and projected temperature ranges (' + season_lu[this.season] + ')',
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
