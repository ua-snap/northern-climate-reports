<template>
  <div>
    <div class="map-title map-container has-text-centered">
      <div>
        <span class="has-text-weight-bold">{{ mapEra }}<br /></span>
        <span v-if="mapModel">{{ mapModel }}<br class="narrow-br" /></span>
        <span>{{ mapScenario }}</span>
      </div>
    </div>
    <div :id="mapID" class="map"></div>
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
/* CSS trick to make height same as dynamic width */
.map {
  height: 0;
  padding-bottom: 100%;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getBaseMapAndLayers, addGeoJSONtoMap } from '~/utils/maps'

let models = [
  '5 Model Average',
  'GFDL CM3',
  'GISS E2-R',
  'IPSL CM5A-LR',
  'MRI CGCM3',
  'NCAR CCSM4',
]

let scenarios = ['RCP 4.5', 'RCP 6.0', 'RCP 8.5']

let eras = [
  '2010-2019',
  '2020-2029',
  '2030-2039',
  '2040-2049',
  '2050-2059',
  '2060-2069',
  '2070-2079',
  '2080-2089',
  '2090-2099',
]

export default {
  name: 'ReportFlammabilityMap',
  props: ['historical', 'scenario', 'model', 'era'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
    }),
    mapID() {
      return 'flammability_' + this.scenario + '_' + this.model + '_' + this.era
    },
    mapModel() {
      if (this.historical != 'true') {
        return models[this.model] + ', '
      }
    },
    mapScenario() {
      if (this.historical == 'true') {
        return 'CRU TS 4.0'
      } else {
        return scenarios[this.scenario]
      }
    },
    mapEra() {
      if (this.historical == 'true') {
        return '1950-2008'
      } else {
        return eras[this.era]
      }
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
        layerOptions['layers'] = 'relative_flammability_historical'
        layerOptions['dim_era'] = this.era
      } else {
        layerOptions['layers'] = 'relative_flammability_future'
        layerOptions['dim_era'] = this.era
        layerOptions['dim_model'] = this.model
        layerOptions['dim_scenario'] = this.scenario
      }
      return new L.tileLayer.wms(process.env.rasdamanUrl, layerOptions)
    },
  },
}
</script>
