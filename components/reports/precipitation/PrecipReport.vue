<template>
	<div>
		<h4 class="subtitle is-4">
			Precipitation
			<span class="units">
				<span v-if="units == 'imperial'">(inches)</span>
				<span v-if="units == 'metric'">(mm)</span>
			</span>
		</h4>
		<div class="content is-size-5">
			Projections for two future time periods are shown for average (mean)
			precipitation. Results are averaged by season (three month averages) for
			two different climate models (MRI-CGCM3 and NCAR-CCSM4) and two different
			greenhouse gas scenarios or Representative Concentration Pathways (RCPs).
			RCP4.5 is an optimistic future, and RCP8.5 is more pessimistic, but also
			more likely.
			<nuxt-link :to="{ name: 'about' }"
				>Read more about models and RCPs.</nuxt-link
			>
		</div>
		<div class="chart-wrapper">
			<ReportChart :reportData="reportData" variable='pr' :units="units" />
		</div>
		<div class="chart-wrapper">
			<ReportTable :reportData="reportData" variable='pr' :units="units" />
		</div>
	</div>
</template>
<style></style>
<script>
import ReportChart from '../ReportChart'
import ReportTable from '../ReportTable'

export default {
	name: 'PrecipReport',
	props: ['reportData', 'units'],
	components: { ReportChart, ReportTable },
}
</script>
