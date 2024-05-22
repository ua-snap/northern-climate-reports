<template>
  <div id="demographics-map"></div>
</template>

<style lang="scss" scoped>
#demographics-map {
  height: 20vw;
  width: 20vw;
  min-width: 200px;
  min-height: 200px;
  margin: 3rem auto 1rem;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      marker: undefined,
      geoJSONLayer: undefined,
    }
  },
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      demographics: 'demographics/demographicsData',
    }),
  },
  mounted() {
    this.map = L.map('demographics-map', this.getBaseMapAndLayers())


  },
  watch: {
    demographics: function () {
      alert('really')
      this.addGeoJSONtoMap()
    },
  },
  methods: {
    addGeoJSONtoMap() {
      alert('trying') 
      if (this.demographics) {
        let displayedGeoJSON = _.cloneDeep(this.demographics.geometry)
        console.log(this.demographics)
        let polygon = L.geoJSON(displayedGeoJSON, { interactive: false })
        this.geoJSONLayer = polygon.addTo(this.map)
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
      // For EPSG:3857
      var config = {
        zoom: 10,
        minZoom: 0,
        maxZoom: 20,
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
