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

let models = {
  3: 'NCAR CCSM4',
  4: 'MRI CGCM3',
}

let scenarios = ['CRU TS 3.1', 'RCP 4.5', 'RCP 8.5']
let eras = ['1995', '2011-2040', '2036-2065', '2061–2090', '2086–2100']

export default {
  name: 'ReportMagtMapTitle',
  props: ['model', 'scenario', 'era'],
  computed: {
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
}
</script>
