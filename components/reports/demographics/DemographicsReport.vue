<template>
  <div>
    <h3 class="title is-3">Demographics</h3>
    <DemographicsMap />
    <div class="content is-size-4">
      <p>
        ⚠️ Demographic data is presented only regionally, at the level of
        boroughs or census tracts.
      </p>
      <p>
        In this section,
        <strong>{{ place }} is used as the name for {{ commentEdited }}</strong
        >, as shown in the map above.
      </p>
    </div>
    <h4 class="title is-4 mt-5">
      In {{ place }}, the population is
      {{ commas(demographics.place.total_population) }}.
    </h4>
    <h5 class="subtitle is-5">
      For comparison, the population of the state of Alaska is
      {{ commas(demographics.alaska.total_population) }} and the population of
      the U.S. is {{ commas(demographics.us.total_population) }}.
    </h5>

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
    <div class="block">
      <h4 class="title is-4">Other demographics</h4>
      <DemographicsOther />
    </div>

    <DownloadCsvButton
      text="Download demographics data as CSV"
      endpoint="demographics"
      class="mt-3 mb-5"
    />
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
import DemographicsOther from '~/components/reports/demographics/DemographicsOther'
import DemographicsMap from '~/components/reports/demographics/DemographicsMap'

export default {
  components: {
    BackToTopButton,
    DownloadCsvButton,
    DemographicsAgesChart,
    DemographicsRaceEthnicityChart,
    DemographicsHealthChart,
    DemographicsOther,
    DemographicsMap,
  },
  mixins: [formatting],
  computed: {
    commentEdited() {
      return this.demographics.place.comment
        .replace('Data for this place represent ', '')
        .replace('Data represent ', '')
        .replace('.', '')
        .replace('county', 'borough')
    },
    ...mapGetters({
      demographics: 'demographics/demographicsData',
      place: 'place/name',
    }),
  },
}
</script>
