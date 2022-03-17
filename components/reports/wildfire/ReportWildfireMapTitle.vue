<template>
  <div class="has-text-centered has-text-weight-bold">
    <span v-if="mapModel">{{ mapModel }}<br /></span>
    <span>{{ mapScenario }}</span>
    <br class="narrow-br" />
    <span>{{ mapEra }}</span>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 900px) {
  .narrow-br {
    display: none;
  }
}
</style>

<script>
import _ from 'lodash'

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
  name: 'ReportWildfireMapTitle',
  props: ['historical', 'model', 'scenario', 'era'],
  computed: {
    mapModel() {
      if (this.historical != 'true') {
        return models[this.model] + ', '
      }
    },
    mapScenario() {
      if (this.historical == 'true') {
        return 'CRU TS 4.0, '
      } else {
        return scenarios[this.scenario] + ', '
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
}
</script>
