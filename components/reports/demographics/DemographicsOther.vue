<template>
  <div>
    <h5 class="title is-5 mt-6">Social Determinants of Health</h5>
    <div class="block" v-if="otherPresent">
      <div class="content is-size-5">
        <p>
          Data from the 2017-2021 CDC Social Determinants of Health (SDOH) dataset and from the 2024 CDC PLACES dataset.
        </p>
      </div>
      <table class="table block-centered demographic">
        <caption>
          Social determinants of health,
          {{
            placeName
          }}, compared to Alaska and U.S.
        </caption>
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
          diploma, living below 150% of poverty line, broadband and more) are
          not available for this location.
        </p>
      </div>
    </div>
    <div class="block">
      <div v-if="disabilityInsurancePresent">
        <div class="content is-size-5">
          <p>
            Data from the 2017&ndash;2021 US Census American Community Survey
            (ACS) 5-year dataset. Values are estimated, and the margin of error
            is shown in parentheses for each value. Based on the total, civilian
            non-institutionalized population.
          </p>
        </div>
        <table class="table block-centered demographic">
          <caption>
            Disability and insurance status,
            {{
              placeName
            }}, compared to Alaska and U.S.
          </caption>
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
                {{ demographics['place'][key] }}% <span class="ci">
                  ({{
                    demographics['place']['moe_' + key]
                  }})
                </span>
              </td>
              <td>
                {{ demographics['alaska'][key] }}% <span class="ci">
                  ({{
                    demographics['alaska']['moe_' + key]
                  }})
                </span>
              </td>
              <td>
                {{ demographics['us'][key] }}% <span class="ci">
                  ({{
                    demographics['us']['moe_' + key]
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
            Demographic information for social determinants of health and
            disability status are not available for this location.
          </p>
        </div>
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
  computed: {
    otherPresent() {
      if (this.demographics) {
        let sum = 0
        Object.keys(this.otherDemographics).forEach(k => {
          sum += Number.parseFloat(this.demographics['place'][k])
        })
        return sum > 0
      }
    },

    disabilityInsurancePresent() {
      if (this.demographics) {
        let sum = 0
        Object.keys(this.acs).forEach(k => {
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
  data() {
    return {
      otherDemographics: {
        pct_minority: 'Persons of racial or ethnic minority status',
        pct_no_hsdiploma:
          'No high school diploma among adults aged 25 years or older',
        pct_below_150pov: 'Persons living below 150% of the poverty level',
        pct_unemployed: 'Unemployment among people aged 16 years or older',
        pct_foodstamps: 'Received food stamps in the past 12 months',
        pct_single_parent: 'Single parent households',
        pct_no_bband: 'No broadband internet subscription among households',
        pct_crowding: 'Crowding',
        pct_hcost: 'Housing cost burden',
        pct_emospt: 'Lack of social and emotional support',
      },
      acs: {
        pct_w_disability: 'Percent with a disability',
        pct_insured: 'Percent insured',
        pct_uninsured: 'Percent uninsured',
      },
    }
  },
}
</script>
