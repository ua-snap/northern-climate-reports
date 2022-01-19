<template>
	<div>
		<h4 class="subtitle is-4">
			Permafrost
			<span class="units">
				<span v-if="units == 'imperial'">(inches)</span>
				<span v-if="units == 'metric'">(meters)</span>
			</span>
		</h4>
		<div class="content is-size-5">
			Projected permafrost active layer thickness through 2095 compared with a
			historical value from 1995. Results were produced by the GIPL 2.0
			permafrost model using five separate climate models and two different
			greenhouse gas scenarios or Representative Concentration Pathways (RCPs).
			RCP4.5 is an optimistic future, and RCP8.5 is more pessimistic but also
			more likely.
			<nuxt-link :to="{ name: 'about' }"
				>Read more about models and RCPs.</nuxt-link
			>
		</div>
		<div class="chart-wrapper">
			<ReportPermafrostChart :reportData="reportData" />
		</div>
	</div>
</template>
<style></style>
<script>
import ReportPermafrostChart from './ReportPermafrostChart'
import { mapGetters } from 'vuex'

export default {
	name: 'PermafrostReport',
	props: ['reportData'],
	components: { ReportPermafrostChart },
	computed: {
		...mapGetters({
			units: 'units',
		})
	}
}
</script>
