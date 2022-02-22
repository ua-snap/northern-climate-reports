<template>
  <div class="report--minimap--wrapper has-text-centered has-text-weight-bold">
    {{ title }}
    <div :id="mapID" class="report--deltamap--map"></div>
  </div>
</template>

<style lang="scss" scoped>
.report--deltamap--map {
  height: 15vw;
  width: 100%;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

let scenarios = ['', 'RCP 4.5', 'RCP 8.5']
let eras = ['1995', '2011-2040', '2036-2065', '2061–2090', '2086–2100']

export default {
  name: 'ReportMagtMap',
  props: ['scenario', 'model', 'era'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
    }),
  },
  data() {
    return {
      mapID: this.getMapID(),
      title: this.getTitle(),
      marker: undefined,
      geoJsonLayer: undefined,
      baseLayer: undefined,
    }
  },
  mounted() {
    this.map = L.map(this.mapID, this.getBaseMapAndLayers())
    if (this.latLng) {
      this.map.panTo(this.latLng)
      this.marker = L.marker(this.latLng).addTo(this.map)
    } else if (this.hucId) {
      // Fetch the GeoJSON outline
      this.loadHucGeoJSON()
    }
  },
  watch: {
    model: function () {
      this.map.removeLayer(this.baseLayer)
      this.baseLayer = this.getBaseLayer()
      this.map.addLayer(this.baseLayer)
    },
    // After geoJSON is loaded, display on map.
    geoJSON: function () {
      this.addGeoJSONtoMap()
    },
  },
  methods: {
    getBaseLayer() {
      return new L.tileLayer.wms(
        'http://apollo.snap.uaf.edu:8080/rasdaman/ows',
        {
          transparent: true,
          format: 'image/png',
          version: '1.3.0',
          layers: 'test_iem_gipl_magt_alt_4km',
          dim_era: this.era,
          dim_model: this.model,
          dim_scenario: this.scenario,
          styles: 'climate_impact_reports',
        }
      )
    },
    addGeoJSONtoMap() {
      if (this.geoJSON) {
        this.geoJSONLayer = L.geoJSON(this.geoJSON, {
          style: {
            color: '#444444',
          },
        }).addTo(this.map)
        this.map.fitBounds(this.geoJSONLayer.getBounds())
      }
    },
    async loadHucGeoJSON() {
      let queryUrl = process.env.apiUrl + '/huc/huc8/' + this.hucId
      // TODO, add error handling here.
      let geoJson = await this.$http.$get(queryUrl)
      this.map.fitBounds(this.geoJsonLayer.getBounds())
    },
    getTitle() {
      var title = ''
      if (this.scenario > 0) {
        title += scenarios[this.scenario] + ', '
      }
      title += eras[this.era]
      return title
    },
    getMapID() {
      return this.scenario + '_' + this.model + '_' + this.era
    },
    getBaseMapAndLayers() {
      // Projection definition.
      var proj = new this.$L.Proj.CRS(
        'EPSG:3338',
        '+proj=aea +lat_1=55 +lat_2=65 +lat_0=50 +lon_0=-154 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
        {
          resolutions: [4096, 2048, 1024, 512, 256, 128, 64],
        }
      )
      this.baseLayer = this.getBaseLayer()
      // Map base configuration
      var config = {
        zoom: 1,
        minZoom: 0,
        maxZoom: 2,
        center: [64.7, -155],
        scrollWheelZoom: false,
        dragging: false,
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
        layers: [this.baseLayer],
        crs: proj,
      }
      return config
    },
  },
}
</script>
