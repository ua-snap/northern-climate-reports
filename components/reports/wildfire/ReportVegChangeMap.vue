<template>
  <div class="has-text-centered has-text-weight-bold">
    <span v-html="title"></span>
    <div :id="mapID" class="veg-change-minimap"></div>
  </div>
</template>

<style lang="scss" scoped>
.veg-change-minimap {
  height: 15vw;
  width: 100%;
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getBaseMapAndLayers, addGeoJSONtoMap } from '../../../utils/maps'

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
  name: 'ReportVegChangeMap',
  props: ['historical', 'scenario', 'model', 'era'],
  computed: {
    ...mapGetters({
      latLng: 'place/latLng',
      geoJSON: 'place/geoJSON',
    }),
    title() {
      if (this.historical == 'true') {
        return 'CRU TS 4.0,<br />1950-2008'
      }
      return (
        models[this.model] +
        ',<br />' +
        scenarios[this.scenario] +
        ', ' +
        eras[this.era]
      )
    },
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
