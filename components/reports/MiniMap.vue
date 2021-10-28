<template>
	<div>
		<div class="report--minimap--wrapper">
			<div id="report--minimmap--map"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.report--minimap--wrapper {
	margin: 2rem 0 3rem;
}
#report--minimmap--map {
	height: 20vw;
	width: 20vw;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
	name: 'MiniMap',
	computed: {
		...mapGetters({
			latLng: 'getLatLng',
			hucId: 'getHucId',
		}),
	},
	data() {
		return {
			marker: undefined,
			geoJsonLayer: undefined,
		}
	},
	mounted() {
		this.map = L.map('report--minimmap--map', this.getBaseMapAndLayers())

		if (this.latLng) {
			this.marker = L.marker(this.latLng).addTo(this.map)
			this.map.panTo(this.latLng)
		} else if (this.hucId) {
			// Fetch the GeoJSON outline
			this.loadHucGeoJSON()
		}
	},
	methods: {
		async loadHucGeoJSON() {
			let queryUrl = process.env.apiUrl + '/huc/huc8/' + this.hucId
			// TODO, add error handling here.
			let geoJson = await this.$http.$get(queryUrl)
			this.geoJsonLayer = L.geoJSON(geoJson).addTo(this.map)
			this.map.fitBounds(this.geoJsonLayer.getBounds())
		},
		getBaseMapAndLayers() {
			var baseLayer = new L.tileLayer.wms(
				"https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?",
				{
					transparent: true,
					format: "image/png",
					version: "1.3.0",
					layers: ["0"]
				}
			);
			// Map base configuration
			var config = {
				zoom: 11,
				minZoom: 0,
				maxZoom: 6,
				center: [64.7, -155],
				scrollWheelZoom: false,
				zoomControl: false,
				doubleClickZoom: false,
				attributionControl: false,
				layers: [baseLayer]
			};
			return config;
		},
	},
}
</script>