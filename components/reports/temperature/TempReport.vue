<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Temperature</h4>
      <div class="is-size-5">
        <p>
          This section shows projections for average (mean) temperature,
          compared with a historical range (1950&ndash;2009). Results are
          averaged by season (three month averages) for two specific climate
          models (MRI-CGCM3 and NCAR-CCSM4) as well as average of five models
          which perform well in Alaska and the Arctic.
          <nuxt-link :to="{ name: 'data', hash: '#datasets' }"
            >See information about the dataset shown here.</nuxt-link
          >
        </p>
      </div>
      <b-field label="Season">
        <b-radio v-model="temp_season" name="temp_season" native-value="DJF"
          >Winter</b-radio
        >
        <b-radio v-model="temp_season" name="temp_season" native-value="MAM"
          >Spring</b-radio
        >
        <b-radio v-model="temp_season" name="temp_season" native-value="JJA"
          >Summer</b-radio
        >
        <b-radio v-model="temp_season" name="temp_season" native-value="SON"
          >Fall</b-radio
        >
      </b-field>
    </div>
    <ReportTempChart :season="temp_season" />
    <ReportTempTable />
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import ReportTempChart from './ReportTempChart'
import ReportTempTable from './ReportTempTable'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportTable',
  components: { ReportTempChart, ReportTempTable },
  data() {
    return {
      temp_season: 'DJF',
    }
  },
  computed: {
    ...mapGetters({
      units: 'units',
    }),
  },
}
</script>
