<template>
  <div>
    <div class="map-title map-container has-text-centered has-text-weight-bold">
      <div>
        <span v-if="mapModel">{{ mapModel }}<br /></span>
        <span>{{ mapScenario }}</span>
        <br class="narrow-br" />
        <span>{{ mapEra }}</span>
      </div>
    </div>
    <div :id="mapID" class="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.map-title {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
@media (max-width: 899px) {
  .map-title {
    min-height: 90px;
  }
}
@media (min-width: 900px) {
  .map-title {
    min-height: 60px;
  }
}
@media (min-width: 900px) {
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

let models = {
  3: 'NCAR CCSM4',
  4: 'MRI CGCM3',
}

let scenarios = ['CRU TS 3.1', 'RCP 4.5', 'RCP 8.5']
let eras = ['1995', '2011-2040', '2036-2065', '2061–2090', '2086–2100']

export default {
  name: 'ReportMagtMap',
  props: ['scenario', 'model', 'era'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
    }),
    mapID() {
      return this.scenario + '_' + this.model + '_' + this.era
    },
    mapModel() {
      if (this.era > 0) {
        return models[this.model]
      }
    },
    mapScenario() {
      return scenarios[this.scenario] + ', '
    },
    mapEra() {
      return eras[this.era]
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
        layers: 'iem_gipl_magt_alt_4km',
        dim_era: this.era,
        dim_model: this.model,
        dim_scenario: this.scenario,
        styles: 'climate_impact_reports',
      })
    },
  },
}
</script>
