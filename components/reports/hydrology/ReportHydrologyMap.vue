<template>
  <div>
    <div class="map-title has-text-centered">
      <div>
        <span class="has-text-weight-bold"
          >{{ mapEra }},<br />{{ mapSeason }}<br
        /></span>
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
  name: 'ReportHydrologyMap',
  props: ['scenario', 'model', 'era', 'var', 'season'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
      models: 'hydrology/models',
      scenarios: 'hydrology/scenarios',
      vars: 'hydrology/vars',
      eras: 'hydrology/eras',
    }),
    mapID() {
      return (
        'hydro_' +
        this.scenario +
        '_' +
        this.model +
        '_' +
        this.era +
        '_' +
        this.var +
        '_' +
        this.season
      )
    },

    mapModel() {
      return this.models[this.model] + ', '
    },
    mapScenario() {
      return this.scenarios[this.scenario]
    },
    mapVar() {
      return this.vars[this.var]
    },
    mapEra() {
      return this.eras[this.era]
    },
    mapSeason() {
      return _.capitalize(this.season)
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
        layers: 'hydrology',
        dim_model: this.model,
        dim_scenario: this.scenario,
        styles: 'hydro_' + this.var + '_' + this.era + '_' + this.season,
      })
    },
  },
}
</script>
