<template>
  <div class="has-text-centered has-text-weight-bold">
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

let scenarios = ['CRU TS 3.1', 'RCP 4.5', 'RCP 8.5']
let eras = ['1995', '2011-2040', '2036-2065', '2061–2090', '2086–2100']

export default {
  name: 'ReportMagtMapTitle',
  props: ['scenario', 'era'],
  computed: {
    mapScenario() {
      return scenarios[this.scenario] + ', '
    },
    mapEra() {
      return eras[this.era]
    },
  },
}
</script>
