<template>
  <div>
    <h4 class="title is-3">Precipitation</h4>
    <div class="content is-size-5">
      <p>
        This section shows projections for average (mean) precipitation, compared
          with a historical range (1950&ndash;2009). Results are averaged by
          season (three month averages) for two specific climate models (MRI-CGCM3
          and NCAR-CCSM4) as well as average of five models which perform well in
          Alaska and the Arctic. <nuxt-link :to="{ name: 'data', hash: '#datasets'}">See information about the dataset shown here.</nuxt-link>
      </p>
    </div>
    <div class="chart-wrapper">
      <b-field label="Season">
        <b-radio v-model="precip_season" name="precip_season" native-value="DJF"
          >Winter</b-radio
        >
        <b-radio v-model="precip_season" name="precip_season" native-value="MAM"
          >Spring</b-radio
        >
        <b-radio v-model="precip_season" name="precip_season" native-value="JJA"
          >Summer</b-radio
        >
        <b-radio v-model="precip_season" name="precip_season" native-value="SON"
          >Fall</b-radio
        >
      </b-field>
      <ReportPrecipChart :reportData="reportData" :season="precip_season" />
    </div>
    <div class="table-wrapper">
      <ReportPrecipTable :reportData="reportData" />
    </div>
  </div>
</template>
<style></style>
<script>
import ReportPrecipChart from './ReportPrecipChart'
import ReportPrecipTable from './ReportPrecipTable'
import { mapGetters } from 'vuex'

export default {
  name: 'PrecipReport',
  props: ['reportData'],
  components: { ReportPrecipChart, ReportPrecipTable },
  data() {
    return {
      precip_season: 'DJF',
    }
  },
  computed: {
    ...mapGetters({
      units: 'units',
    }),
  },
}
</script>
