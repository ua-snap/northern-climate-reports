<template>
  <div>
    <h5 class="title is-5">Health conditions</h5>
    <div class="block" v-if="healthConditionsPresent">
      <div class="content is-size-5">
        <p>Data from the 2023 CDC PLACES dataset.</p>
      </div>
      <table class="table block-centered">
        <caption>
          Health conditions<br /><span class="clause"
            >crude prevalence, 95% confidence interval</span
          >
        </caption>
        <thead>
          <th scope="col">Condition</th>
          <th scope="col">{{ placeName }}</th>
          <th scope="col">Alaska</th>
          <th scope="col">U.S.</th>
        </thead>
        <tbody>
          <tr v-for="(conditionName, key) in conditions">
            <th scope="row" v-html="conditionName"></th>
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
          Demographic information for health conditions (asthma, COPD, heart
          disease, stroke, chronic kidney disease) are not available for this
          location.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  th[scope='row'] {
    max-width: 30rem;
  }
  caption {
    font-size: 110%;
    font-weight: 500;
    .clause {
      font-size: 100%;
      font-weight: 400;
    }
  }
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getPlotSettings } from '~/utils/charts'
import { formatting } from '~/mixins/formatting'

export default {
  mixins: [formatting],
  data() {
    return {
      conditions: {
        pct_asthma: 'Current asthma among adults aged &ge;18 years',
        pct_copd:
          'Chronic obstructive pulmonary disease among adults aged &ge;18 years',
        pct_hd: 'Coronary heart disease among adults aged &ge;18 years',
        pct_stroke: 'Stroke among adults aged &ge;18 years',
        pct_diabetes: 'Diagnosed diabetes among adults aged &ge;18 years',
        pct_kd: 'Chronic kidney disease among adults aged &ge;18 years',
      },
    }
  },
  computed: {
    healthConditionsPresent() {
      if (this.demographics) {
        let sum = 0
        Object.keys(this.conditions).forEach(k => {
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
}
</script>
