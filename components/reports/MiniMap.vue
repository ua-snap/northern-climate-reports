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
  name: 'MiniMap',
  data() {
    return {
      marker: undefined,
      geoJSONLayer: undefined,
    }
  },
  props: ['polystyle'],
  computed: {
    polygonStyle() {
      // The 'vivid' style is the default (blue border/background).
      let geoJSONOptions = {
        interactive: false, // outlines of areas should not be interactive
      }
      if (this.polystyle != 'vivid') {
        geoJSONOptions.style = {
          stroke: false,
          color: '#000000',
          fillOpacity: 0.3,
        }
      }
      return geoJSONOptions
    },
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
    }),
  },
  mounted() {
    this.map = L.map('report--minimmap--map', this.getBaseMapAndLayers())

    // It's a lat/Lng location (community or point) add the point to the map.
    if (this.latLng) {
      this.marker = L.marker(this.latLng).addTo(this.map)
      this.map.flyTo(this.latLng)
    }
  },
  async fetch() {
    // Fetch GeoJSON, including the surrounding HUC12
    await this.$store.dispatch(
      'place/fetch',
      this.$store.getters['wildfire/huc12Id']
    )
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
        let displayedGeoJSON = _.cloneDeep(this.geoJSON)

        // If this polygon crosses the antimeridian, move points from the far
        // east to the far west. For example, a point with longitude 175 will be
        // converted to -185. This is needed for Leaflet to draw the polygon
        // correctly across the antimeridian.
        let coordinates = displayedGeoJSON.geometry.coordinates
        coordinates.forEach((coordinate, coordIdx) => {
          coordinate.forEach((polygon, polyIdx) => {
            polygon.forEach((point, pointIdx) => {
              let latlng = coordinates[coordIdx][polyIdx][pointIdx]
              if (latlng[0] > 0) {
                coordinates[coordIdx][polyIdx][pointIdx][0] -= 360
              }
            })
          })
        })

        let polygon = L.geoJSON(displayedGeoJSON, this.polygonStyle)
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
