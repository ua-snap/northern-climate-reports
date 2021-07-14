<template>
	<div class="container">
		<section class="section">
			<b-button v-on:click="clearLocation">Go Back / Show Location Pickers</b-button>
			<h3 class="title is-4">Projected Future Conditions for [place]</h3>
		</section>
		<section class="section">
			<TempReport></TempReport>
		</section>
		<section class="section">
			<PrecipReport></PrecipReport>
		</section>
	</div>
</template>
<style></style>
<script>
import TempReport from '~/components/TempReport'
import PrecipReport from '~/components/PrecipReport'
import { mapMutations } from 'vuex'

export default {
	name: 'Report',
	components: {TempReport, PrecipReport},
	methods: {
		...mapMutations(['clearLocation'])
	}
}
</script>
