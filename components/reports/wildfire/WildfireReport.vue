<template>
  <div>
    <div class="content">
      <h4 class="title is-3">Wildfire</h4>
      <div class="is-size-5 mb-6">
        <p>
          The following charts show the historical and projected relative
          flammability and vegetation change for this location. Values represent
          the average number of times the pixel at this location has burned or
          changed dominant vegetation type for varios models and scenarios.
          <nuxt-link :to="{ name: 'data', hash: '#datasets' }"
            >See information about the dataset shown here.</nuxt-link
          >
        </p>
      </div>
      <div class="chart-wrapper">
        <ReportFlammabilityChart />
      </div>
      <div class="chart-wrapper">
        <ReportVegChangeChart />
      </div>
    </div>
  </div>
</template>
<style></style>
<script>
import ReportFlammabilityChart from './ReportFlammabilityChart'
import ReportVegChangeChart from './ReportVegChangeChart'
import { mapGetters } from 'vuex'

export default {
  name: 'WildfireReport',
  components: { ReportFlammabilityChart, ReportVegChangeChart },
}
</script>
