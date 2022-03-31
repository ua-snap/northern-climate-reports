<template>
  <div>
    <div class="map-title has-text-centered">
      <div>
        <span class="has-text-weight-bold">{{ mapEra }}<br /></span>
        <span v-if="mapModel">{{ mapModel }}<br class="narrow-br" /></span>
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

let eras = {
  relative_flammability_historical: {
    climate_impact_reports: '1950-2008',
  },
  relative_flammability_future: {
    'rcp45_2010-2039': '2010-2039',
    'rcp45_2040-2069': '2040-2069',
    'rcp45_2070-2099': '2070-2099',
    'rcp85_2010-2039': '2010-2039',
    'rcp85_2040-2069': '2040-2069',
    'rcp85_2070-2099': '2070-2099',
  },
}

let models = {
  relative_flammability_historical: {
    climate_impact_reports: 'CRU TS 4.0',
  },
  relative_flammability_future: {
    'rcp45_2010-2039': 'NCAR CCSM4',
    'rcp45_2040-2069': 'NCAR CCSM4',
    'rcp45_2070-2099': 'NCAR CCSM4',
    'rcp85_2010-2039': 'NCAR CCSM4',
    'rcp85_2040-2069': 'NCAR CCSM4',
    'rcp85_2070-2099': 'NCAR CCSM4',
  },
}

let scenarios = {
  relative_flammability_historical: {
    climate_impact_reports: 'Historical',
  },
  relative_flammability_future: {
    'rcp45_2010-2039': 'RCP 4.5',
    'rcp45_2040-2069': 'RCP 4.5',
    'rcp45_2070-2099': 'RCP 4.5',
    'rcp85_2010-2039': 'RCP 8.5',
    'rcp85_2040-2069': 'RCP 8.5',
    'rcp85_2070-2099': 'RCP 8.5',
  },
}

export default {
  name: 'ReportFlammabilityMap',
  props: ['layer', 'map_style'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
      scenarios: 'wildfire/scenarios',
    }),
    mapID() {
      return 'flammability_' + this.layer + '_' + this.map_style
    },
    mapEra() {
      return eras[this.layer][this.map_style]
    },
    mapModel() {
      return models[this.layer][this.map_style] + ', '
    },
    mapScenario() {
      return scenarios[this.layer][this.map_style]
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
        layers: this.layer,
        styles: this.map_style,
      }
      return new L.tileLayer.wms(process.env.rasdamanUrl, layerOptions)
    },
  },
}
</script>
