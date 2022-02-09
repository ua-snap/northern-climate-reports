<template>
  <div>
    <div class="report--minimap--wrapper">
      <div id="report--minimmap--map"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#report--minimmap--map {
  height: 20vw;
  min-width: 10vw;
  width: 100%;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'MiniMap',
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
    }),
  },
  data() {
    return {
      marker: undefined,
      geoJSONLayer: undefined,
    }
  },
  mounted() {
    this.map = L.map('report--minimmap--map', this.getBaseMapAndLayers())

    // It's a lat/Lng location (community or point) add the point to the map.
    if (this.latLng) {
      this.marker = L.marker(this.latLng).addTo(this.map)
      this.map.panTo(this.latLng)
    }
  },
  async fetch() {
    // Only fetch the GeoJSON if this is not a point location.
    if (!this.latLng) {
      await this.$store.dispatch('place/fetch')
    }
  },
  watch: {
    // After geoJSON is loaded, display on map.
    geoJSON: function () {
      this.addGeoJSONtoMap()
    },
  },
  methods: {
    addGeoJSONtoMap() {
      if (this.geoJSON) {
        this.geoJSONLayer = L.geoJSON(this.geoJSON).addTo(this.map)
        this.map.fitBounds(this.geoJSONLayer.getBounds())
      }
    },
    getBaseMapAndLayers() {
      var baseLayer = new L.tileLayer.wms(
        'https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?',
        {
          transparent: true,
          format: 'image/png',
          version: '1.3.0',
          layers: ['0'],
        }
      )
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
        layers: [baseLayer],
      }
      return config
    },
  },
}
</script>
