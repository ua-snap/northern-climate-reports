<template>
  <div>
    <h5 class="title is-5 mt-6">Social Determinants of Health</h5>
    <div class="block" v-if="otherPresent">
      <div class="content is-size-5">
        <p>Data from the 2017-2021 CDC Social Determinants of Health (SDOH) dataset.</p>
      </div>
      <table class="table">
        <thead>
          <th scope="col"></th>
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
          Some social determinants of health (minority status, high school
          diploma, living below 150% of poverty line, and broadband) are not
          available for this location.
        </p>
      </div>
    </div>
    <div class="block">
      <div v-if="disabilityInsurancePresent">
        <div class="content is-size-5">
          <p>
            Data in this section were taken from the 2017&ndash;2021 US Census American Community Survey (ACS) 5-year dataset. Values are estimated, and the margin of error is shown in parentheses for each value. Based on the total, civilian non-institutionalized population.
          </p>
        </div>
        <table class="table">
          <thead>
            <th scope="col"></th>
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
  data() {
    return {
      otherDemographics: {
        pct_minority: 'Persons of racial or ethnic minority status',
        pct_no_hsdiploma:
          'No high school diploma among adults aged 25 years or older',
        pct_below_150pov: 'Persons living below 150% of the poverty level',
        pct_no_bband: 'No broadband internet subscription among households',
      },
      acs: {
        pct_w_disability:
          'Percent with a disability, estimate, total civilian noninstitutionalized population',
        pct_insured:
          'Percent insured, estimate, civilian noninstitutionalized population',
        pct_uninsured:
          'Percent uninsured, estimate, civilian noninstitutionalized population',
      },
    }
  },
}
</script>
