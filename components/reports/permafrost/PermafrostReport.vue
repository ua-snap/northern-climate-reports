<template>
	<div>
		<h4 class="subtitle is-3">
			Permafrost
			<span class="units">
				<span v-if="units == 'imperial'">(inches)</span>
				<span v-if="units == 'metric'">(meters)</span>
			</span>
		</h4>
		<div class="content is-size-5">
			<span
				v-show="
					permafrostPresent && permafrostDisappears && !permafrostUncertain
				"
			>
				Projected permafrost active layer thickness and ground freeze depth
				through the end of the century is shown below. The active layer is the
				layer of soil above permafrost that thaws seasonally.
			</span>
			<span
				v-show="
					permafrostPresent && !permafrostDisappears && !permafrostUncertain
				"
			>
				Projected permafrost active layer thickness through the end of the
				century is shown below. The active layer is the layer of soil above
				permafrost that thaws seasonally.
			</span>
			<span
				v-show="
					!permafrostPresent && permafrostDisappears && !permafrostUncertain
				"
			>
				There is no permafrost within three meters of the ground surface at this
				location. Projected ground freeze depth through the end of the century
				is shown below.
			</span>
			<span v-show="permafrostUncertain">
				The presence or absence of permafrost could not be determined for this
				location because the historical mean annual ground temperature falls
				within the threshold of uncertainty. A chart of the historical and
				projected mean annual ground temperature is provided below.
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
		<div class="chart-wrapper permafrost" v-show="this.permafrostUncertain">
			<ReportMagtChart />
		</div>
	</div>
</template>
<style></style>
<script>
import ReportAltThawChart from './ReportAltThawChart'
import ReportAltFreezeChart from './ReportAltFreezeChart'
import ReportMagtChart from './ReportMagtChart'
import { mapGetters } from 'vuex'

export default {
	name: 'PermafrostReport',
	components: { ReportAltThawChart, ReportAltFreezeChart, ReportMagtChart },
	computed: {
		...mapGetters({
			permafrostPresent: 'permafrost/present',
			permafrostDisappears: 'permafrost/disappears',
			permafrostUncertain: 'permafrost/uncertain',
		}),
	},
}
</script>
