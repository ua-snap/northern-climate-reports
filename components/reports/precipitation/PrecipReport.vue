<template>
  <div>
    <h4 class="subtitle is-4">
      Precipitation
      <span class="units">
        <span v-if="units == 'imperial'">(inches)</span>
        <span v-if="units == 'metric'">(mm)</span>
      </span>
    </h4>
    <div class="content is-size-5">
      Projections for each decade through the end of the century are shown for
      average (mean) precipitation, compared with a historical range. Results
      are averaged by season (three month averages) for two specific climate
      models (MRI-CGCM3 and NCAR-CCSM4) as well as a 5-model average. Three
      different greenhouse gas scenarios or Representative Concentration
      Pathways (RCPs) are shown for each model. RCP4.5 is an optimistic future,
      and RCP8.5 is more pessimistic but also more likely. RCP6.0 is an
      emissions scenario between RCP4.5 and RCP8.5.
      <nuxt-link :to="{ name: 'about' }"
        >Read more about models and RCPs.</nuxt-link
      >
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
