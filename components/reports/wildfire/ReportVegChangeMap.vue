<template>
  <div>
    <div class="map-title has-text-centered">
      <div>
        <span class="has-text-weight-bold">{{ mapEra }}<br /></span>
        <span v-if="mapModel">{{ mapModel }}<br class="narrow-br" /></span>
        <span v-else>(Modeled)<br class="narrow-br" /></span>
        <span>{{ mapScenario }}</span>
      </div>
    </div>
    <div :id="mapID" class="minimap"></div>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 1215px) {
  .map-title {
    min-height: 84px;
  }
}
@media (min-width: 1216px) {
  .map-title {
    min-height: 60px;
  }
  .narrow-br {
    display: none;
  }
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
      vegEras: 'wildfire/vegEras',
      models: 'wildfire/vegModels',
      scenarios: 'wildfire/scenarios',
    }),
    mapID() {
      return 'veg_change_' + this.scenario + '_' + this.model + '_' + this.era
    },
    mapEra() {
      return this.vegEras[this.era]
    },
    mapModel() {
      if (this.models[this.model] != '') {
        return this.models[this.model] + ', '
      } else {
        return ''
      }
    },
    mapScenario() {
      return this.scenarios[this.scenario]
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
    // Pass `true` to `getBaseMapAndLayers` to add land cover layer
    this.map = L.map(this.mapID, this.getBaseMapAndLayers(true))
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
      this.baseLayer.bringToBack()
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
        zIndex: 20,
      }
      layerOptions['layers'] = 'alfresco_vegetation_mode_statistic'
      layerOptions['dim_era'] = this.era
      layerOptions['dim_model'] = this.model
      layerOptions['dim_scenario'] = this.scenario
      return new L.tileLayer.wms(process.env.rasdamanUrl, layerOptions)
    },
  },
}
</script>
