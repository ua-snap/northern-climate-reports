<template>
	<div class="container">
		<section class="section">
			<b-button tag="nuxt-link" to="/">
				Go Back / Show Location Pickers</b-button
			>
			<h3 class="title is-4">
				Projected Future Conditions for <span v-html="place"></span>
			</h3>
			<div v-if="$fetchState.pending">
				<!-- Drama dots -->
				<b-progress type="is-info" :value="timer" show-value></b-progress>
				<h4 class="title is-5">Loading data&hellip;</h4>
			</div>
			<div v-else-if="$fetchState.error" class="error">
				<p>
					Oh no! Something&rsquo;s amiss and the report for this place
					couldn&rsquo;t be loaded.
				</p>
				<b-button tag="nuxt-link" to="/">
					Go back and try another place</b-button
				>
			</div>
			<div v-else>
				<TempReport :reportData="results"></TempReport>
				<PrecipReport :reportData="results"></PrecipReport>
			</div>
		</section>
	</div>
</template>
<style></style>
<script>
import TempReport from '~/components/TempReport'
import PrecipReport from '~/components/PrecipReport'
import { mapGetters } from 'vuex'

export default {
	name: 'Report',
	components: { TempReport, PrecipReport },
	data() {
		return {
			results: undefined,
			timer: undefined,
		}
	},
	computed: {
		...mapGetters({
			place: 'getPlaceName',
			latLng: 'getLatLng',
		}),
	},
	async fetch() {
		// TODO: add error handling here for 404 (no data) etc.
		
		// TODO: detect the type of request being made and configure the timer.
		// Point queries are fast (1 second or so), don't show a progress bar.
		// HUC/area queries are slow (30 seconds or more), show a progress bar.
		this.startTimer()
		
		// Perform the query.
		// Point query below, commented out until all supporting code for HUCs is
		// ready.
		// if (this.latLng) {
		// 	this.results = await this.$http.$get(
		// 		'http://localhost:5000/iem/point/' +
		// 			this.latLng[0] +
		// 			'/' +
		// 			this.latLng[1]
		// 	)
		// }
		// Temporary hardcoded HUC.
		this.results = await this.$http.$get(
			'http://localhost:5000/iem/huc/19070506'
		)
		
		this.stopTimer()
	},
	methods: {
		// Rough initial implementation.
		startTimer(duration = 45) {
			this.timer = duration
			this.countdown = setInterval(() => {
				if (this.timer > 5) {
					this.timer -= 1
				}
			}, 1000)
		},
		stopTimer() {
			clearInterval(this.countdown)
		},
	},
}
</script>
