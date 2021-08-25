<template>
	<div id="results" class="container">
		<section class="section">
			<div class="back">
				<b-button
					class="default"
					tag="nuxt-link"
					to="/#controls"
					type="is-info"
					icon-left="arrow-left-circle"
				>
					Go Back, Pick Another Place</b-button
				>
			</div>
			<hr />
			<h3 class="title is-4 place">
				Projected Future Conditions for <span v-html="place"></span>
			</h3>
			<div v-if="$fetchState.pending">
				<!-- Drama dots -->
				<h4 class="title is-5">Loading data&hellip;</h4>
				<b-progress type="is-info"></b-progress>
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
				<!-- The report! -->
				<div class="report-controls">
					<div class="content-placeholder">What text might go here, introducing the results?</div>
					<b-field label="Units">
						<b-radio v-model="units" name="units" native-value="imperial">
							Imperial
						</b-radio>
						<b-radio v-model="units" name="units" native-value="metric">
							Metric
						</b-radio>
					</b-field>
				</div>
				<div class="report-type-wrapper">
					<TempReport :reportData="results" :units="units"></TempReport>
				</div>
				<div class="report-type-wrapper">
					<PrecipReport :reportData="results" :units="units"></PrecipReport>
				</div>
				<div class="content-placeholder">What text might go here, as a kind of in-place explainer -- possibly not at the same level of detail as we have elsewhere, but supporting some broad important concepts about the results?</div>
			</div>
		</section>
	</div>
</template>
<style lang="scss" scoped>
.report-controls {
	margin-bottom: 1.25rem;
}
.report-type-wrapper {
	margin: 1rem 0 2.5rem;
}
::v-deep table.table {
	margin-top: -1rem;
}
.back {
	margin-bottom: 2rem;
}
.place {
	::v-deep .watershed {
		color: #888;
		font-weight: 300;
	}
}
.b-radio.radio:not(.button) {
	margin-right: 1rem;
}
</style>

<script>
import TempReport from '~/components/TempReport'
import PrecipReport from '~/components/PrecipReport'
import { mapGetters } from 'vuex'
import lodash from 'lodash'
import deepdash from 'deepdash'

const _ = deepdash(lodash)

export default {
	name: 'Report',
	components: { TempReport, PrecipReport },
	data() {
		return {
			originalData: undefined, // for the raw stuff back from API
			results: undefined, // may be metric or imperial
			units: 'metric',
		}
	},
	computed: {
		...mapGetters({
			place: 'getPlaceName',
			latLng: 'getLatLng',
			hucId: 'getHucId',
		}),
	},
	async fetch() {
		// TODO: add error handling here for 404 (no data) etc.
		let queryUrl = process.env.apiUrl + '/iem/'

		// Determine the query type to perform.
		if (this.hucId) {
			// Fetch areal data by HUC.
			queryUrl += 'huc/' + this.hucId
		} else if (this.latLng) {
			queryUrl += '/point/' + this.latLng[0] + '/' + this.latLng[1]
		} else {
			// Don't know what to query, bail.
			return
		}
		this.results = await this.$http.$get(queryUrl)
		this.originalData = this.results // save a copy!
	},
	watch: {
		units: function () {
			if (this.units == 'metric') {
				this.results = this.originalData
			} else {
				this.results = _.mapValuesDeep(
					this.originalData,
					(value, key, context) => {
						if (key == 'pr') {
							// Convert to inches!
							return (value * 0.03937008).toFixed(2)
						} else if (key == 'tas') {
							// Convert to degrees F!
							return (value * 1.8 + 32).toFixed(1)
						}
					},
					{
						leavesOnly: true,
					}
				)
			}
		},
	},
}
</script>
