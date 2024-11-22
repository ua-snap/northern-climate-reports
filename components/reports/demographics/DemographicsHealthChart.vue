<template>
  <div>
    <h5 class="title is-5">Health conditions</h5>
    <div class="block" v-if="healthConditionsPresent">
      <div class="content is-size-5">
        <p>
          Data from the 2023 CDC PLACES dataset. Values are crude prevalence,
          and the 95% confidence interval is shown in parentheses for each
          value.
        </p>
      </div>
      <table class="table block-centered demographic">
        <caption>
          Health conditions among adults aged &ge;18 years,
          {{
            placeName
          }}, compared to Alaska and U.S.
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
            <td>
              {{ demographics['place'][key] }}%
              <span class="ci">
                ({{ demographics['place'][key + '_low'] }}&ndash;{{
                  demographics['place'][key + '_high']
                }})
              </span>
            </td>
            <td>
              {{ demographics['alaska'][key] }}%
              <span class="ci">
                ({{ demographics['alaska'][key + '_low'] }}&ndash;{{
                  demographics['alaska'][key + '_high']
                }})
              </span>
            </td>
            <td>
              {{ demographics['us'][key] }}%
              <span class="ci">
                ({{ demographics['us'][key + '_low'] }}&ndash;{{
                  demographics['us'][key + '_high']
                }})
              </span>
            </td>
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
span.ci {
  font-weight: 400;
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
        pct_asthma: 'Current asthma',
        pct_copd: 'Chronic obstructive pulmonary disease',
        pct_hd: 'Coronary heart disease',
        pct_stroke: 'Stroke',
        pct_diabetes: 'Diagnosed diabetes',
        pct_mh: 'Frequent mental distress',
      },
    }
  },
  computed: {
    healthConditionsPresent() {
      if (this.demographics) {
        let sum = 0
        Object.keys(this.conditions).forEach(k => {
          sum += Number.parseFloat(this.demographics['place'][k])
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
