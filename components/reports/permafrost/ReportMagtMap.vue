<template>
  <div>
    <div class="map-title has-text-centered">
      <div>
        <span class="has-text-weight-bold">{{ daterange }}<br /></span>
        <span v-if="mapModel">{{ mapModel }}<br class="narrow-br" /></span>
        <span>{{ mapScenario }}</span>
      </div>
    </div>
    <div :id="mapID" class="minimap"></div>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 929px) {
  .map-title {
    min-height: 84px;
  }
}
@media (min-width: 930px) {
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
  name: 'ReportMagtMap',
  props: ['scenario', 'model', 'daterange'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
      models: 'gipl/models',
      scenarios: 'gipl/scenarios',
    }),
    mapID() {
      return this.scenario + '_' + this.model + '_' + this.daterange
    },

    mapModel() {
      // The "era" at index 0 is the historical year (1995).
      console.log('##### mapModel #####')
      console.log(this.era)
      console.log(this.model)
      console.log(this.models)
      return this.models[this.model] + ', '
    },
    mapScenario() {
      // The "scenario" at index 0 is the historical data set (CRU TS 3.1).
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
    this.map = L.map(this.mapID, this.getBaseMapAndLayers())
    if (this.latLng) {
      this.marker = L.marker(this.latLng).addTo(this.map)
      this.map.flyTo(this.latLng, 4)
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
      return new L.tileLayer.wms(process.env.rasdamanUrl, {
        transparent: true,
        format: 'image/png',
        version: '1.3.0',
        layers: 'crrel_gipl_outputs',
        dim_model: this.model,
        dim_scenario: this.scenario,
        dim_variable: 1,
        styles: 'magt1m_' + this.daterange.replace(/-/g, '_'),
      })
    },
  },
}
</script>
