<template>
	<div class="Permafrost-chart-wrapper">
		<div id="Permafrost-chart" />
	</div>
</template>
<style lang="scss" scoped>
.Permafrost-chart-wrapper {
	padding-bottom: 0rem;
}
</style>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
	name: 'ReportPermafrostChart',
	props: ['permafrostData'],
	mounted() {
		this.renderPlot()
	},
	computed: {
		...mapGetters({
			units: 'units',
		})
	},
	watch: {
		permafrostData: function () {
			this.renderPlot()
		},
		units: function () {
			this.renderPlot()
		},
	},
	methods: {
		renderPlot: function () {
			let permafrostData = this.permafrostData
			if (!permafrostData) {
				return
			}

			let data_traces = []
			let units = this.units == 'metric' ? 'm' : 'in'

			let eras_lu = {
				'1995': '1995',
				'2025': '2011 - 2040',
				'2050': '2036 - 2065',
				'2075': '2061 – 2090',
				'2095': '2086 – 2100',
			}

			let years = Object.keys(eras_lu)
			let eras = Object.values(eras_lu)

			let historical_y = Array(eras.length).fill(null)
			historical_y[0] = this.permafrostData['gipl']['1995']['cruts31']['historical']['alt']

			let historical = {
				type: 'scatter',
				mode: 'markers',
				name: 'Historical (1995)',
				hoverinfo: 'x+y+z+text',
				hovertemplate: '%{y}' + units,
				marker: {
					symbol: Array(eras.length).fill('star'),
					size: 9,
					color: '#888888',
				},
				x: eras,
				y: historical_y,
			}

			let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
			let scenarios = ['rcp45', 'rcp85']

			let traceLabels_lu = {
				'gfdlcm3': {
					'rcp45': 'RCP 4.5 (gfdlcm3)',
					'rcp85': 'RCP 8.5 (gfdlcm3)',
				},
				'gisse2r': {
					'rcp45': 'RCP 4.5 (gisse2r)',
					'rcp85': 'RCP 8.5 (gisse2r)',
				},
				'ipslcm5alr': {
					'rcp45': 'RCP 4.5 (ipslcm5alr)',
					'rcp85': 'RCP 8.5 (ipslcm5alr)',
				},
				'mricgcm3': {
					'rcp45': 'RCP 4.5 (mricgcm3)',
					'rcp85': 'RCP 8.5 (mricgcm3)',
				},
				'ncarccsm4': {
					'rcp45': 'RCP 4.5 (ncarccsm4)',
					'rcp85': 'RCP 8.5 (ncarccsm4)',
				},
			}

			let scatterTraces = {}

			let symbols = {
				'gfdlcm3': 'circle',
				'gisse2r': 'square',
				'ipslcm5alr': 'diamond',
				'mricgcm3': 'cross',
				'ncarccsm4': 'x',
			}

			let colors = {
				'gfdlcm3': {
					'rcp45': 'rgb(230, 150, 150)',
					'rcp85': 'rgb(190, 30, 30)',
				},
				'gisse2r': {
					'rcp45': 'rgb(150, 150, 230)',
					'rcp85': 'rgb(30, 30, 190)',
				},
				'ipslcm5alr': {
					'rcp45': 'rgb(210, 210, 150)',
					'rcp85': 'rgb(140, 140, 30)',
				},
				'mricgcm3': {
					'rcp45': 'rgb(250, 150, 30)',
					'rcp85': 'rgb(210, 120, 30)',
				},
				'ncarccsm4': {
					'rcp45': 'rgb(210, 150, 210)',
					'rcp85': 'rgb(140, 30, 140)',
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
						y: [null],
					}
				})
			})

			models.forEach(model => {
				years.forEach(year => {
					if (year != '1995') {
						scenarios.forEach(scenario => {
							let scenarioAlt = this.permafrostData['gipl'][year][model][scenario]['alt']
							scatterTraces[model][scenario]['y'].push(scenarioAlt)
						})
					}
				})
			})

			data_traces.push(historical)

			models.forEach(model => {
				scenarios.forEach(scenario => {
					data_traces.push(scatterTraces[model][scenario])
				})
			})

			let hoverformat = '.1f'
			let layout = {
				boxmode: 'group',
				xaxis: {
					type: 'category'
				},
				yaxis: {
					title: {
						text: 'Permafrost ' + units,
						font: {
							size: 18,
						},
					},
					hoverformat: hoverformat,
				},
				title: {
					text: 'Historical and projected active layer permafrost thickness',
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
					x: 1.03
				},
				margin: {
					b: 40
				},
				height: 400,
				dragmode: false,
			}

			this.$Plotly.newPlot('Permafrost-chart', data_traces, layout, {
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
