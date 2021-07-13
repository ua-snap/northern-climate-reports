<template>
	<div id="map"></div>
</template>

<script>
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
// import proj4 from 'proj4'
// import p4l from 'proj4leaflet' /* eslint-disable-line */

export default {
	name: 'Map',
	mounted() {
		this.map = L.map('map', this.getBaseMapAndLayers())
		new this.$L.Control.Zoom({ position: 'topright' }).addTo(this.map)

		// this.map.on('click', _.debounce(this.handleMapClick, 200))
		// Necessary to see the markers .
		this.$L.Icon.Default.imagePath = this.baseURL
	},
	methods: {
		getBaseMapAndLayers() {
			var baseLayer = new this.$L.tileLayer.wms(
				process.env.geoserverUrl,
				{
					transparent: true,
					srs: 'EPSG:3338',
					format: 'image/png',
					version: '1.3.0',
					continuousWorld: true, // needed for non-3857 projs
					layers: ['atlas_mapproxy:alaska_osm'],
				}
			)

			// Projection definition.
			var proj = new this.$L.Proj.CRS(
				'EPSG:3338',
				'+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
				{
					resolutions: [4096, 2048, 1024, 512, 256, 128, 64],

					// Origin should be lower-left coordinate
					// in projected space.  Use GeoServer to
					// find this:
					// TileSet > Gridset Bounds > compute from maximum extent of SRS
					origin: [-4648005.934316417, 444809.882955059],
				}
			)

			// Map base configuration
			var config = {
				zoom: 0,
				minZoom: 0,
				maxZoom: 5,
				center: [67, -170],
				scrollWheelZoom: false,
				crs: proj,
				continuousWorld: true,
				worldCopyJump: false,
				zoomControl: false,
				doubleClickZoom: false,
				attributionControl: false,
				layers: [baseLayer],
			}

			return config
		},
	},
}
</script>

<style>
#map {
	height: 100vh;
	width: 100vw;
	border: 1px solid red;
}
</style>
