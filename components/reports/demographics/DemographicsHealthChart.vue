<template>
  <div>
    <div class="block">
      <h5 class="title is-5">Disability &amp; insurance</h5>
      <div class="content is-size-5">
        <p>
          Data in this section taken from Census ACS 5-year Year 2023.
          <strong> Values are estimated</strong>; margin of error is shown in
          parenthesis for each value.
        </p>
      </div>
      <table class="table">
        <caption>
          Disability &amp; insurance
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
            <td>{{ demographics['place'][key] }}% ({{ demographics['place']['moe_'+key] }}%)</td>
            <td>{{ demographics['alaska'][key] }}% ({{ demographics['alaska']['moe_'+key] }}%)</td>
            <td>{{ demographics['us'][key] }}% ({{ demographics['us']['moe_'+key] }}%)</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="block">
      <h5 class="title is-5">Health conditions</h5>
      <div class="content is-size-5">
        <p>Data in this section taken from CDC PLACES Year 2023.</p>
      </div>
      <table class="table">
        <caption>
          Health conditions
        </caption>
        <thead>
          <th scope="col">Condition</th>
          <th scope="col">{{ placeName }}</th>
        </thead>
        <tbody>
          <tr v-for="(conditionName, key) in conditions">
            <th scope="row" v-html="conditionName"></th>
            <td>{{ demographics['place'][key] }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  margin-left: 200px;
  th[scope="row"] {
    max-width: 30rem;
  
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
        pct_w_disability:
          'Percent with a disability, estimate, total civilian noninstitutionalized population',
        pct_insured:
          'Percent insured, estimate, civilian noninstitutionalized population',
        pct_uninsured:
          'Percent uninsured, estimate, civilian noninstitutionalized population',
      },
    }
  },
  computed: {
    ...mapGetters({
      demographics: 'demographics/demographicsData',
      placeName: 'place/name',
    }),
  },
}
</script>
