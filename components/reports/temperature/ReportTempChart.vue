<template>
	<div style="display: none;" class="temp-chart-wrapper">
		<div id="temp-chart" />
	</div>
</template>
<style lang="scss" scoped>
.temp-chart-wrapper {
	padding-bottom: 6rem;
}
</style>
<script>
import _ from 'lodash'
export default {
	name: 'ReportTempChart',
	props: ['reportData', 'units'],
	mounted() {
		this.renderPlot()
	},
	watch: {
		reportData: function () {
			this.renderPlot()
		},
	},
	methods: {
		renderPlot: function () {
			let reportData = this.reportData
			if (!reportData) {
				return
			}

			let seasons = ['DJF', 'MAM', 'JJA', 'SON']
			let seasons_names = ['Winter', 'Spring', 'Summer', 'Fall']
			let data_traces = []
			let axisGroups = {
				DJF: { x: 'x1', y: 'y1' },
				MAM: { x: 'x2', y: 'y2' },
				JJA: { x: 'x3', y: 'y3' },
				SON: { x: 'x4', y: 'y4' },
			}
			let units = this.units == 'metric' ? 'ºC' : 'ºF'
			function get_seasonal_subplot(season) {
				let xAxisDef = [
					'<b>2040-2070</b>, MRI-CGCM3',
					'<b>2040-2070</b>, NCAR-CCSM4',
					'<b>2070-2100</b>, MRI-CGCM3',
					'<b>2070-2100</b>, NCAR-CCSM4',
				]

				let trace_rcp45 = {
					x: xAxisDef,
					y: [
						reportData['2040_2070'][season]['MRI-CGCM3']['rcp45']['tas'],
						reportData['2040_2070'][season]['CCSM4']['rcp45']['tas'],
						reportData['2070_2100'][season]['MRI-CGCM3']['rcp45']['tas'],
						reportData['2070_2100'][season]['CCSM4']['rcp45']['tas'],
					],
					xaxis: axisGroups[season]['x'],
					yaxis: axisGroups[season]['y'],
					type: 'scatter',
					mode: 'markers',
					showlegend: false,
					marker: { color: '#999', size: 8, symbol: 'square' },
				}

				let trace_rcp85 = {
					x: xAxisDef,
					y: [
						reportData['2040_2070'][season]['MRI-CGCM3']['rcp85']['tas'],
						reportData['2040_2070'][season]['CCSM4']['rcp85']['tas'],
						reportData['2070_2100'][season]['MRI-CGCM3']['rcp85']['tas'],
						reportData['2070_2100'][season]['CCSM4']['rcp85']['tas'],
					],
					xaxis: axisGroups[season]['x'],
					yaxis: axisGroups[season]['y'],
					type: 'scatter',
					mode: 'markers',
					showlegend: false,
					marker: { color: '#333', size: 8 },
				}

				let historical_temp =
					reportData['1910-2009'][season]['CRU-TS31']['CRU_historical']['tas']
				let trace_historical = {
					x: xAxisDef,
					y: [
						historical_temp,
						historical_temp,
						historical_temp,
						historical_temp,
					],
					xaxis: axisGroups[season]['x'],
					yaxis: axisGroups[season]['y'],
					name: 'cats',
					type: 'scatter',
					mode: 'lines+text',
					showlegend: false,
					text: [
						'Historical (CRU TS 3.1), <b>' + historical_temp + units + '</b>',
						'',
						'',
						'',
					],
					textposition: 'top right',
				}

				data_traces.push(trace_rcp45, trace_rcp85, trace_historical)
			}

			seasons.forEach((season) => {
				get_seasonal_subplot(season)
			})

			var annotations = _.map(seasons_names, (season, index) => {
				return {
					xref: 'paper',
					yref: 'paper',
					x: index * 0.25 + 0.015 * index, // wiggle a bit
					y: 1.025,
					xanchor: 'left',
					yanchor: 'bottom',
					text: season,
					font: {
						family: 'Arial',
						size: 18,
						color: 'rgb(37,37,37)',
					},
					showarrow: false,
				}
			})

			var layout = {
				grid: { rows: 1, columns: 4, pattern: 'independent' },
				yaxis: {
					title: {
						text: 'Temperature ' + units,
						font: {
							size: 18,
						},
					},
				},
				title: {
					text: 'Projected temperatures',
					font: {
						size: 24,
					},
				},
				annotations: annotations,
				// showlegend: false,
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
