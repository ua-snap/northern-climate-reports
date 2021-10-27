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
				Projections for two future time periods are shown for average (mean)
				temperature. Results are averaged by season (three month averages) for
				two different climate models (MRI-CGCM3 and NCAR-CCSM4) and two
				different greenhouse gas scenarios or Representative Concentration
				Pathways (RCPs). RCP4.5 is an optimistic future, and RCP8.5 is more
				pessimistic, but also more likely.
				<nuxt-link :to="{ name: 'about' }"
					>Read more about models and RCPs.</nuxt-link
				>
			</p>
		</div>
		<div class="chart-wrapper">
			<QualitativeText :reportData="reportData" :place="place" :units="units" />
		</div>
		<div class="chart-wrapper">
			<ReportTempChart :reportData="reportData" :units="units" />
		</div>
		<div class="table-wrapper">
			<reportTempTable :reportData="reportData" :units="units" />
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
import QualitativeText from './ReportTempText'
export default {
	name: 'ReportTable',
	props: ['reportData', 'place', 'units'],
	components: { ReportTempChart, ReportTempTable, QualitativeText },
}
</script>
