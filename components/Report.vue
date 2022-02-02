<template>
  <div id="results" class="container">
    <div class="back">
      <b-button
        class="default"
        tag="nuxt-link"
        to="/#controls"
        type="is-info"
        icon-left="arrow-left-circle"
      >
        <strong>Go back</strong>, pick another place</b-button
      >
    </div>
    <hr />
    <div v-if="$fetchState.pending">
      <!-- Drama dots -->
      <h4 class="title is-5">Loading data&hellip;</h4>
      <b-progress type="is-info"></b-progress>
    </div>
    <div v-else-if="$fetchState.error" class="error">
      <p class="content is-size-5">
        Oh no! Something&rsquo;s amiss and the report for this place
        couldn&rsquo;t be loaded.
      </p>
      <b-button
        class="is-warning"
        tag="nuxt-link"
        to="/#controls"
        icon-left="emoticon-sad-outline"
      >
        <strong>We&rsquo;re sorry</strong>, please try again</b-button
      >
    </div>
    <div v-else>
      <!-- The report! -->
      <section class="section">
        <h3 class="title is-3 centered">
          Projected Conditions for <span v-html="place"></span>
        </h3>
        <QualitativeText />
      </section>
      <section class="section">
        <div class="columns">
          <div class="column is-one-quarter">
            <MiniMap />
          </div>
          <div class="column is-three-quarters">
            <div class="report-controls">
              <div class="content is-size-5">
                <p>
                  The tables and charts below are specific to the selected
                  point, or have been averaged across the selected HUC or
                  ecoregion. Note that the precision of these results depends on
                  the grid resolution (pixel size) of the underlying dataset.
                  Also note that some data layers are not available as point
                  data or at the HUC or ecoregion level.
                </p>
                <p>
                  These data have been averaged by season.
                  <strong>Winter</strong> is December, January and February.
                  <strong>Spring</strong> is March, April and May.
                  <strong>Summer</strong> is June, July and August, and
                  <strong>Fall</strong> is September, October and November.
                </p>
              </div>
              <b-field label="Units">
                <b-radio v-model="units" name="units" native-value="imperial">
                  Imperial
                </b-radio>
                <b-radio v-model="units" name="units" native-value="metric">
                  Metric
                </b-radio>
              </b-field>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="report-type-wrapper">
          <TempReport />
        </div>
        <div class="report-type-wrapper">
          <PrecipReport />
        </div>
        <div class="report-type-wrapper">
          <PermafrostReport />
        </div>
        <div class="content is-size-5">
          <p>
            Comparing projections with historical data in the first column
            offers broad insights into future trends. Comparisons between models
            and RCPs offers a range of uncertainty with regard to these trends.
            It is important to note that even small changes in precipitation and
            temperature may result in profound landscape effects, particularly
            if threshold values are crossed. For example, a shift from
            below-freezing to above-freezing temperature can alter permafrost
            and active layer, while hotter sping and summer temperatures can
            increase fire frequency. Temperature and precipitation data are used
            as inputs in many other models.
          </p>
          <p>
            Many of these datasets were produced as part of the Integrated
            Ecosystem Management (IEM) Project.
            <a
              href="https://uaf-snap.org/project/iem-an-integrated-ecosystem-model-for-alaska-and-northwest-canada/"
              >Read more about this project</a
            >, or
            <a href="http://ckan.snap.uaf.edu/dataset?tags=IEM"
              >access these datasets</a
            >.
          </p>
          <p>
            <DownloadCsvButton />
          </p>
        </div>
      </section>
      <hr />
      <div class="back">
        <b-button
          class="default"
          tag="nuxt-link"
          to="/#controls"
          type="is-info"
          icon-left="arrow-left-circle"
        >
          <strong>Go back</strong>, pick another place</b-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.centered {
  text-align: center;
}
.report-controls {
  margin-bottom: 1.25rem;
}
.report-type-wrapper {
  margin: 1rem 0 2.5rem;
}
.back {
  margin-bottom: 2rem;
}
.b-radio.radio:not(.button) {
  margin-right: 1rem;
}
</style>

<script>
import TempReport from '~/components/reports/temperature/TempReport'
import PrecipReport from '~/components/reports/precipitation/PrecipReport'
import PermafrostReport from '~/components/reports/permafrost/PermafrostReport'
import MiniMap from '~/components/reports/MiniMap'
import QualitativeText from '~/components/reports/QualitativeText'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import { mapGetters } from 'vuex'
import lodash from 'lodash'
import deepdash from 'deepdash'

const _ = deepdash(lodash)

export default {
  name: 'Report',
  components: {
    TempReport,
    PrecipReport,
    PermafrostReport,
    MiniMap,
    QualitativeText,
    DownloadCsvButton,
  },
  data() {
    return {
      units: 'imperial',
    }
  },
  computed: {
    ...mapGetters({
      place: 'placeName',
    }),
  },
  // This component initiates the data fetching so that
  // error handling, etc, can all be done in one spot.
  async fetch() {
    // TODO: Error handling.
    this.$store.dispatch('climate/fetch').catch(e => {
      console.error(e)
    })
    this.$store.dispatch('permafrost/fetch').catch(e => {
      console.error(e)
    })
  },
  created() {
    // Switch back to clean URL after S3 redirect. Adapted from here:
    // https://via.studio/journal/hosting-a-reactjs-app-with-routing-on-aws-s3
    const path = (/#!(\/.*)$/.exec(this.$route.fullPath) || [])[1]
    if (path) {
      this.$router.push({ path: path })
    }
    this.$fetch()
  },
  watch: {
    units: function () {
      if (this.units == 'metric') {
        this.$store.commit('setMetric')
      } else {
        this.$store.commit('setImperial')
      }
    },
  },
}
</script>
