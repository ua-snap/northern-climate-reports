<template>
	<div class="report--temperature">
		<h4 class="subtitle is-4">
			Temperature
			<span class="units">
				<span v-if="units == 'imperial'">(&deg;F)</span>
				<span v-if="units == 'metric'">(&deg;C)</span>
			</span>
		</h4>
		<div class="content is-size-5">
			<p>
				Projections for each decade through the end of the century are shown for
				average (mean) temperature, compared with a historical range. Results
				are averaged by season (three month averages) for two specific climate
				models (MRI-CGCM3 and NCAR-CCSM4) as well as a 5-model average. Three
				different greenhouse gas scenarios or Representative Concentration
				Pathways (RCPs) are shown for each model. RCP4.5 is an optimistic future,
				and RCP8.5 is more pessimistic but also more likely. RCP6.0 is an
				emissions scenario between RCP4.5 and RCP8.5.
				<nuxt-link :to="{ name: 'about' }"
					>Read more about models and RCPs.</nuxt-link
				>
			</p>
		</div>
		<div class="chart-wrapper">
			<b-field label="Season">
				<b-radio v-model="temp_season" name="temp_season" native-value="DJF">Winter</b-radio>
				<b-radio v-model="temp_season" name="temp_season" native-value="MAM">Spring</b-radio>
				<b-radio v-model="temp_season" name="temp_season" native-value="JJA">Summer</b-radio>
				<b-radio v-model="temp_season" name="temp_season" native-value="SON">Fall</b-radio>
			</b-field>
			<ReportTempChart :reportData="reportData" :season="temp_season" />
		</div>
		<div class="table-wrapper">
			<reportTempTable :reportData="reportData" />
		</div>
	</div>
</template>
<style lang="scss" scoped>
.report--temperature {
	margin-top: 2.25rem;
}
table.table {
	margin-top: 2.25rem;
}
</style>
<script>
import ReportTempChart from './ReportTempChart'
import ReportTempTable from './ReportTempTable'
import { mapGetters } from 'vuex'
export default {
	name: 'ReportTable',
	props: ['reportData'],
	components: { ReportTempChart, ReportTempTable },
	data() {
		return {
			temp_season: 'DJF'
		}
	},
	computed: {
		...mapGetters({
			units: 'units',
		})
	}
}
</script>
