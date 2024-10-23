<template>
  <div>
    <div class="block" v-if="otherPresent">
      <div class="content is-size-5">
        <p>Data in this section were taken from CDC SDOH Years 2017-2021.</p>
      </div>
      <table class="table">
        <caption>
          Additional demographics
        </caption>
        <thead>
          <th scope="col">Demographic</th>
          <th scope="col">{{ placeName }}</th>
          <th scope="col">Alaska</th>
          <th scope="col">U.S.</th>
        </thead>
        <tbody>
          <tr v-for="(name, key) in otherDemographics">
            <th scope="row">{{ name }}</th>
            <td>{{ demographics['place'][key] }}%</td>
            <td>{{ demographics['alaska'][key] }}%</td>
            <td>{{ demographics['us'][key] }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <div class="content is-size-5">
        <p>
          Additional demographics (minority status, high school diploma, living
          below 150% of poverty line, and broadband) are not available for this
          location.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings } from '~/utils/charts'
import { formatting } from '~/mixins/formatting'

export default {
  mixins: [formatting],
  computed: {
    otherPresent() {
      if (this.demographics) {
        let sum = 0
        Object.keys(this.otherDemographics).forEach(k => {
          sum += this.demographics['place'][k]
        })
        return sum > 0
      }
    },
    ...mapGetters({
      demographics: 'demographics/demographicsData',
      placeName: 'place/name',
    }),
  },
  data() {
    return {
      otherDemographics: {
        pct_minority: 'Persons of racial or ethnic minority status',
        pct_no_hsdiploma:
          'No high school diploma among adults aged 25 years or older',
        pct_below_150pov: 'Persons living below 150% of the poverty level',
        pct_no_bband: 'No broadband internet subscription among households',
      },
    }
  },
}
</script>
