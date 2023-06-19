<template>
  <div>
    <div class="map-title has-text-centered">
      <div>
        <span class="has-text-weight-bold">{{ mapEra }}<br /></span>
        <span v-if="mapModel">{{ mapModel }}<br /></span>
        <span v-else>(Modeled)<br /></span>
        <span>{{ mapScenario }}<br /></span>
        <span>{{ mapSnowpack }}<br /></span>
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
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getBaseMapAndLayers, addGeoJSONtoMap } from '~/utils/maps'

export default {
  name: 'ReportBeetleRiskMap',
  props: ['scenario', 'model', 'era', 'snowpack'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
      eras: 'beetle/beetleEras',
      models: 'beetle/beetleModels',
      scenarios: 'beetle/beetleScenarios',
      snowpacks: 'beetle/beetleSnowpacks',
    }),
    mapID() {
      return (
        'beetle_risk_' +
        this.scenario +
        '_' +
        this.model +
        '_' +
        this.era +
        '_' +
        this.snowpack
      )
    },
    mapEra() {
      return this.eras[this.era]
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
    mapSnowpack() {
      return this.snowpacks[this.snowpack]
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
    this.addGeoJSONtoMap = addGeoJSONtoMap.bind(this, 2)
    this.map = L.map(this.mapID, this.getBaseMapAndLayers())
    if (this.latLng) {
      this.marker = L.marker(this.latLng).addTo(this.map)
      this.map.panTo(this.latLng)
    } else if (this.geoJSON != undefined) {
      this.map.whenReady(() => {
        this.addGeoJSONtoMap()
      })
    }
  },
  watch: {
    model: function () {
      this.updateMaps()
    },
    snowpack: function () {
      this.updateMaps()
    },
    // After geoJSON is loaded, display on map.
    geoJSON: function () {
      this.addGeoJSONtoMap()
    },
  },
  methods: {
    updateMaps() {
      this.map.removeLayer(this.baseLayer)
      this.baseLayer = this.getBaseLayer()
      this.map.addLayer(this.baseLayer)
      this.baseLayer.bringToBack()
    },
    getBaseLayer() {
      let layerOptions = {
        transparent: true,
        format: 'image/png',
        version: '1.3.0',
        styles: 'beetle_risk',
      }
      layerOptions['layers'] = 'beetle_risk'
      layerOptions['dim_era'] = this.era
      layerOptions['dim_model'] = this.model
      layerOptions['dim_scenario'] = this.scenario
      layerOptions['dim_snowpack'] = this.snowpack
      return new L.tileLayer.wms(process.env.rasdamanUrl, layerOptions)
    },
  },
}
</script>
