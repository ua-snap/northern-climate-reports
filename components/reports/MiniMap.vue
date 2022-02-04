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
      latLng: 'getLatLng',
      hucId: 'getHucId',
      protectedAreaId: 'getProtectedAreaId',
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
    } else if (this.hucId || this.protectedAreaId) {
      // Fetch the GeoJSON outline
      this.loadPolyGeoJSON()
    }
  },
  methods: {
    async loadPolyGeoJSON() {
      let queryUrl = process.env.apiUrl
      if (this.hucId) {
        queryUrl += '/boundary/huc8/' + this.hucId
      } else if (this.protectedAreaId) {
        queryUrl += '/boundary/protectedarea/' + this.protectedAreaId
      }
      // TODO, add error handling here.
      let geoJson = await this.$http.$get(queryUrl)
      this.geoJsonLayer = L.geoJSON(geoJson).addTo(this.map)
      this.map.fitBounds(this.geoJsonLayer.getBounds())
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
