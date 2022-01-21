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
			Explanation text goes here.
			<nuxt-link :to="{ name: 'about' }"
				>Read more about models and RCPs.</nuxt-link
			>
		</div>
		<div class="chart-wrapper permafrost">
			<ReportAltThawChart :permafrostData="permafrostData" />
		</div>
		<div class="chart-wrapper permafrost">
			<ReportAltFreezeChart :permafrostData="permafrostData" />
		</div>
	</div>
</template>
<style></style>
<script>
import ReportAltThawChart from './ReportAltThawChart'
import ReportAltFreezeChart from './ReportAltFreezeChart'
import { mapGetters } from 'vuex'

export default {
	name: 'PermafrostReport',
	props: ['permafrostData'],
	components: { ReportAltThawChart, ReportAltFreezeChart },
	computed: {
		...mapGetters({
			units: 'units',
		})
	}
}
</script>
