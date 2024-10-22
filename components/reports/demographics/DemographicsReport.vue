<template>
  <div>
    <h3 class="title is-3">Demographics and Health</h3>
    <div class="content my-5 is-size-4">
      <p>
        The demographic and health data below have been curated from publicly
        available sources, including data from the U.S. Census and the CDC’s
        Behavioral Risk Factor Surveillance System (BRFSS), to make them more
        accessible to Alaska communities. This resource was developed in
        collaboration with community and state partners to ensure it meets local
        needs. Our goal is to break down barriers to data access, providing key
        information at the community level where decisions are made.
      </p>
      <p>
        Health data are only shown for locations with an adult population of 50
        or more, based on the 2020 U.S. Census.
      </p>
    </div>
    <DemographicsMap />
    <div class="content is-size-4 mt-6">
      <p>
        Demographic data is presented only regionally, at the level of boroughs,
        census-sesignated places (CDPs), incorporated places, and census tracts.
      </p>
      <p>
        <strong>This section shows information from {{ commentEdited }}</strong
        >, as shown in the map above. Census boundaries are designed to produce
        meaningful, relevant, and reliable statistical data, closely
        representing the community’s population, but they do not necessarily
        align with traditional or historical community borders.
      </p>
    </div>

    <h4 class="title is-4 mt-5">Demographics</h4>
    <h5 class="title is-5">Population</h5>
    <div class="content is-size-5">
      <p class="mb-0 pb-0">
        <strong>
          {{ commas(demographics.place.total_population) }}
        </strong>
      </p>
      <p class="mt-0 pt-0">
        For comparison, the population of the state of Alaska is
        {{ commas(demographics.alaska.total_population) }} and the population of
        the U.S. is {{ commas(demographics.us.total_population) }}.
      </p>
    </div>

    <div class="block mb-6">
      <h4 class="title is-5">Age</h4>
      <DemographicsAgesChart />
    </div>
    <div class="block">
      <h4 class="title is-5">Race &amp; Ethnicity</h4>
      <DemographicsRaceEthnicityChart />
    </div>
    <div class="block">
      <h4 class="title is-4">Health</h4>
      <div class="content is-size-4">
        <p>
          Health data are only shown for locations with an adult population of
          50 or more, based on the 2020 U.S. Census.
        </p>
      </div>
      <DemographicsHealthChart />
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
