<template>
  <div class="has-text-centered has-text-weight-bold">
    <div :id="mapID" class="veg-change-minimap"></div>
  </div>
</template>

<style lang="scss" scoped>
/* CSS trick to make height same as dynamic width */
.veg-change-minimap {
  height: 0;
  padding-bottom: 100%;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getBaseMapAndLayers, addGeoJSONtoMap } from '~/utils/maps'

export default {
  name: 'ReportVegChangeMap',
  props: ['historical', 'scenario', 'model', 'era'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
    }),
    mapID() {
      return 'veg_change_' + this.scenario + '_' + this.model + '_' + this.era
    },
  },
  data() {
    return {
      marker: undefined,
      geoJsonLayer: undefined,
      baseLayer: undefined,
    }
  },
  mounted() {
    this.getBaseMapAndLayers = getBaseMapAndLayers.bind(this)
    this.addGeoJSONtoMap = addGeoJSONtoMap.bind(this)
    this.map = L.map(this.mapID, this.getBaseMapAndLayers())
    if (this.latLng) {
      this.marker = L.marker(this.latLng).addTo(this.map)
      this.map.panTo(this.latLng)
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
      let layerOptions = {
        transparent: true,
        format: 'image/png',
        version: '1.3.0',
        styles: 'climate_impact_reports',
      }
      if (this.historical == 'true') {
        layerOptions['layers'] = 'relative_vegetation_change_historical'
        layerOptions['dim_era'] = this.era
      } else {
        layerOptions['layers'] = 'relative_vegetation_change_future'
        layerOptions['dim_era'] = this.era
        layerOptions['dim_model'] = this.model
        layerOptions['dim_scenario'] = this.scenario
      }
      return new L.tileLayer.wms(process.env.rasdamanUrl, layerOptions)
    },
  },
}
</script>
