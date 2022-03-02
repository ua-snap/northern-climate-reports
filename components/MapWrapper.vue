<template>
	<div class="map-wrapper--outer">
		<div class="container">
			<div class="section pullup content fullbleed">
				<h4>Find a place by clicking on the map</h4>
				<p><strong>Click the map</strong> to pick a location.</p>
			</div>
		</div>
		<div id="map-search">
			<div class="is-flex is-flex-direction-row">
				<div id="map--wrapper" v-bind:class="{ minimized: mapSearchIsVisible }">
					<Map />
				</div>
				<div
					id="map--sidebar"
					v-bind:class="{ minimized: !mapSearchIsVisible }"
					class="content fullbleed"
				>
					<SearchResults />
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
#map-search {
	padding-top: 2rem;
}
#map--wrapper {
	height: 100vh;
	width: 100vw;

	&.minimized {
		width: 50vw;
		height: 50vw; // square
		margin-right: 1.5rem;
	}

	transition: width 0.3s ease-in-out;
}

#map--sidebar {
	display: block;
	width: 50vw;
	height: 50vw;

	&.minimized {
		display: none;
	}
}
</style>
<script>
import Map from './Map'
import SearchResults from './SearchResults'
import { mapGetters } from 'vuex'

export default {
	name: 'MapWrapper',
	components: { Map, SearchResults },
	computed: {
		...mapGetters({
			searchResults: 'place/searchResults',
			mapSearchIsVisible: 'mapSearchIsVisible',
		}),
	},
	async fetch() {
		await this.$store
			.dispatch('place/search', {
				lat: this.lat,
				lng: this.lng,
			})
			.then(res => {
				// Some work remains TBD here.
			})
			.catch(e => {
				console.error(e)
			})
	},
}
</script>
