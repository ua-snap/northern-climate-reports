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
    </div>
    <DemographicsMap />
    <div class="content is-size-4 mt-6">
      <p>
        Demographic data are presented regionally, at the level of borough,
        census-designated place (CDPs), incorporated place, or census tracts.
      </p>
      <p>
        <strong>This section shows {{ commentEdited }}</strong
        >, as shown in the map above. Census boundaries are designed to produce
        meaningful, relevant, and reliable statistical data, closely
        representing the community’s population, but they do not necessarily
        align with traditional or historical community borders.
      </p>
    </div>

    <h4 class="title is-4 mt-5">Demographics</h4>
    <h5 class="title is-5">Total Population</h5>
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
      <div class="content is-size-4 mb-6">
        <p>
          Health data are only shown for locations with an adult population of
          50 or more, based on the 2020 U.S. Census.
          <nuxt-link :to="{ name: 'data' }"
            >Learn more about the data sources here</nuxt-link
          >
          or <a :href="demographicsCsvUrl">download a CSV</a> for definitions
          and sources for each variable.
        </p>
        <p>
          Confidence intervals (shown in parentheses for each value) show the
          range where the true value is likely to fall, based on the data
          collected, with a 90% confidence level. For example, if a confidence
          interval is 45%&ndash;50%, it means we're 90% confident the true value
          is between 45% and 50%. Wider intervals suggest more uncertainty,
          while narrower intervals mean more precise estimates.
        </p>
        <p>
          <strong>How do I interpret these data?</strong> The indicators below
          focus on biomedical aspects of health, offering a snapshot of a
          community's overall health status compared to Alaska and the U.S. as a
          whole. These indicators can help highlight areas where public health
          efforts might be needed or identify populations in the community that
          may need additional support. They can also highlight community
          strengths. For example, if only a small percentage of people lack
          access to broadband internet, it suggests that most residents have
          internet connectivity&mdash;a valuable tool for communication and
          staying connected.
        </p>

        <p>
          It's important to note that these indicators reflect just one
          dimension of health. Other aspects, such as intergenerational
          knowledge transfer, sovereignty, and cultural well-being, are also
          vital to community health, particularly in Indigenous contexts, and
          may not be captured here.
        </p>
      </div>
      <div v-if="adultPopulation >= 50">
        <DemographicsHealthChart />
        <DemographicsOther />
      </div>
    </div>

    <DownloadCsvButton
      text="Download demographics and health data as CSV"
      endpoint="demographics"
      class="mt-3 mb-5"
    />

    <div v-if="communityId === 'AK15'">
      <DownloadCsvButton
        text="Download demographics and health data for Anchorage (Dgheyaytnu) neighborhoods as CSV"
        staticUrl="/Demographic and Health Data for Anchorage (Dgheyaytnu) Neighborhoods.csv"
        class="mb-5"
      />
    </div>
  </div>
</template>
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
      if (!this.demographics.place.comment) {
        // It's a borough or census designated place
        return 'the ' + this.demographics.place.name
      } else {
        return this.demographics.place.comment
          .replace('Data for this place represent ', '')
          .replace('Data represent ', '')
          .replace('.', '')
          .replace('county', 'borough')
      }
    },
    adultPopulation() {
      let totalPopulation = this.demographics.place.total_population
      let percentUnder18 = this.demographics.place.pct_under_18
      let populationUnder18 = Math.round(
        totalPopulation * (percentUnder18 / 100)
      )
      return totalPopulation - populationUnder18
    },
    demographicsCsvUrl() {
      return (
        process.env.apiUrl +
        '/demographics/' +
        this.$store.getters['place/communityId'] +
        '?format=csv'
      )
    },
    ...mapGetters({
      demographics: 'demographics/demographicsData',
      place: 'place/name',
      communityId: 'place/communityId',
    }),
  },
}
</script>
