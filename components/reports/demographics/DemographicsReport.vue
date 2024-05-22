<template>
  <div>
    <h3 class="title is-3">Demographics</h3>
    <h4 class="title is-4 mt-5">
      In {{ place }}, the population is
      {{ commas(demographics.place.total_population) }}.
    </h4>
    <h5 class="subtitle is-5">
      For comparison, the population of the state of Alaska is
      {{ commas(demographics.alaska.total_population) }} and the population of
      the U.S. is {{ commas(demographics.us.total_population) }}.
    </h5>
    <div class="block content is-size-5">
      Information in this section is taken from the 2020 U.S. Census.
      {{ demographics.place.comment }}
    </div>

    <div class="block mb-6">
      <h4 class="title is-4">Age</h4>
      <DemographicsAgesChart />
    </div>
    <div class="block">
      <h4 class="title is-4">Race &amp; Ethnicity</h4>
      <DemographicsRaceEthnicityChart />
    </div>
    <div class="block">
      <h4 class="title is-4">Health</h4>
      <DemographicsHealthChart />
    </div>

    <DownloadCsvButton
      text="Download demographics data as CSV"
      endpoint="demographics"
      class="mt-3 mb-5"
    />

    <BackToTopButton />
  </div>
</template>
<style></style>
<script>
import { mapGetters } from 'vuex'
import { formatting } from '~/mixins/formatting'
import BackToTopButton from '~/components/reports/BackToTopButton'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import DemographicsAgesChart from '~/components/reports/demographics/DemographicsAgesChart'
import DemographicsRaceEthnicityChart from '~/components/reports/demographics/DemographicsRaceEthnicityChart'
import DemographicsHealthChart from '~/components/reports/demographics/DemographicsHealthChart'

export default {
  components: {
    BackToTopButton,
    DownloadCsvButton,
    DemographicsAgesChart,
    DemographicsRaceEthnicityChart,
    DemographicsHealthChart,
  },
  mixins: [formatting],
  computed: {
    ...mapGetters({
      demographics: 'demographics/demographicsData',
      place: 'place/name',
    }),
  },
}
</script>
