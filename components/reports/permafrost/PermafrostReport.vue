<template>
	<div>
		<h4 class="title is-3">Permafrost</h4>
		<div class="content is-size-5">
			<span v-show="permafrostPresent && permafrostDisappears">
				Projected permafrost active layer thickness and ground freeze depth
				through the end of the century. The active layer is the layer of soil
				above permafrost that thaws seasonally.
			</span>
			<span v-show="permafrostPresent && !permafrostDisappears">
				Projected permafrost active layer thickness through the end of the
				century. The active layer is the layer of soil above permafrost that
				thaws seasonally.
			</span>
			<span v-show="!permafrostPresent && permafrostDisappears">
				Projected ground freeze depth through the end of the century.
			</span>
			Results were produced by the GIPL 2.0 permafrost model using five separate
			climate models and two different greenhouse gas scenarios or
			Representative Concentration Pathways (RCPs). RCP4.5 is an optimistic
			future, and RCP8.5 is more pessimistic but also more likely.
			<nuxt-link :to="{ name: 'about' }"
				>Read more about models and RCPs.</nuxt-link
			>
		</div>
		<div class="chart-wrapper permafrost" v-show="this.permafrostPresent">
			<ReportAltThawChart />
		</div>
		<div class="chart-wrapper permafrost" v-show="this.permafrostDisappears">
			<ReportAltFreezeChart />
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
	components: { ReportAltThawChart, ReportAltFreezeChart },
	computed: {
		...mapGetters({
			permafrostPresent: 'permafrost/present',
			permafrostDisappears: 'permafrost/disappears',
		}),
	},
}
</script>
