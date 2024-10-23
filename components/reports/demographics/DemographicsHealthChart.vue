<template>
  <div>
    <div class="block">
      <h5 class="title is-5">Disability &amp; insurance</h5>
      <div v-if="disabilityInsurancePresent">
        <div class="content is-size-5">
          <p>
            Data in this section were taken from Census ACS 5-year
            (2018&ndash;2022).
            <strong> Values are estimated</strong>; margin of error is shown in
            parentheses for each value.
          </p>
        </div>
        <table class="table">
          <caption>
            Disability &amp; insurance<br /><span class="clause"
              >estimate, total civilian noninstitutionalized population</span
            >
          </caption>
          <thead>
            <th scope="col">Condition</th>
            <th scope="col">{{ placeName }}</th>
            <th scope="col">Alaska</th>
            <th scope="col">U.S.</th>
          </thead>
          <tbody>
            <tr v-for="(name, key) in acs">
              <th scope="row" v-html="name"></th>
              <td>
                {{ demographics['place'][key] }}% ({{
                  demographics['place']['moe_' + key]
                }}%)
              </td>
              <td>
                {{ demographics['alaska'][key] }}% ({{
                  demographics['alaska']['moe_' + key]
                }}%)
              </td>
              <td>
                {{ demographics['us'][key] }}% ({{
                  demographics['us']['moe_' + key]
                }}%)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="content is-size-5">
          <p>
            Demographic information for insurance status and people with a
            disability are not available for this location.
          </p>
        </div>
      </div>
    </div>
    <!-- If pct_asthma is missing/blank, the other conditions are as well. -->
    <h5 class="title is-5 pt-6">Health conditions</h5>
    <div class="block" v-if="healthConditionsPresent">
      <div class="content is-size-5">
        <p>Data in this section were taken from CDC PLACES Year 2023.</p>
      </div>
      <table class="table">
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
      acs: {
        pct_w_disability: 'Percent with a disability',
        pct_insured: 'Percent insured',
        pct_uninsured: 'Percent uninsured',
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
    disabilityInsurancePresent() {
      if (this.demographics) {
        let sum = 0
        Object.keys(this.acs).forEach(k => {
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
