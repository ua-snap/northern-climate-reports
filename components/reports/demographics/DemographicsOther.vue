<template>
  <div>
    <div class="block" v-if="otherPresent">
      <table class="table block-centered demographic is-fullwidth mb-6">
        <caption>
          <a
            href="https://odphp.health.gov/healthypeople/priority-areas/social-determinants-health"
            >Social determinants of health</a
          >,
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
            <td>
              {{ demographics['place'][key] }}%
              <span
                v-if="
                  demographics['place'][key + '_low'] &&
                  demographics['place'][key + '_high']
                "
                class="ci"
              >
                ({{ demographics['place'][key + '_low'] }}&ndash;{{
                  demographics['place'][key + '_high']
                }})
              </span>
            </td>
            <td>
              {{ demographics['alaska'][key] }}%
              <span
                v-if="
                  demographics['alaska'][key + '_low'] &&
                  demographics['alaska'][key + '_high']
                "
                class="ci"
              >
                ({{ demographics['alaska'][key + '_low'] }}&ndash;{{
                  demographics['alaska'][key + '_high']
                }})
              </span>
            </td>
            <td>
              {{ demographics['us'][key] }}%
              <span
                v-if="
                  demographics['us'][key + '_low'] &&
                  demographics['us'][key + '_high']
                "
                class="ci"
              >
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
          Some social determinants of health (minority status, high school
          diploma, living below 150% of poverty line, broadband and more) are
          not available for this location.
        </p>
      </div>
    </div>
    <div class="block">
      <div v-if="disabilityInsurancePresent">
        <table class="table block-centered demographic mb-6">
          <caption>
            Disability and insurance status,*
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
                {{ demographics['place'][key] }}%
                <span
                  class="ci"
                  v-html="
                    confidenceInverval(
                      demographics['place'][key],
                      demographics['place']['moe_' + key]
                    )
                  "
                />
              </td>
              <td>
                {{ demographics['alaska'][key] }}%
                <span
                  class="ci"
                  v-html="
                    confidenceInverval(
                      demographics['alaska'][key],
                      demographics['alaska']['moe_' + key]
                    )
                  "
                />
              </td>
              <td>
                {{ demographics['us'][key] }}%
                <span
                  class="ci"
                  v-html="
                    confidenceInverval(
                      demographics['us'][key],
                      demographics['us']['moe_' + key]
                    )
                  "
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">
                *These data include the total civilian population, excluding
                people in the military or living in places like nursing homes or
                prisons.
              </td>
            </tr>
          </tfoot>
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
  methods: {
    confidenceInverval(value, moe) {
      let valueFloat = parseFloat(value)
      let moeFloat = parseFloat(moe)
      return (
        '(' +
        _.round(valueFloat - moeFloat, 1).toFixed(1) +
        '&ndash;' +
        _.round(valueFloat + moeFloat, 1).toFixed(1) +
        ')'
      )
    },
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
