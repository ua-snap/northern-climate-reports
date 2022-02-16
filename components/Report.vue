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
      <section class="section" id="toc">
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
        <h3 class="title is-3">Introduction</h3>
        <div class="content is-size-5">
          <p>The sections below show output from different scientific simulations for possible future conditions for temperature, precipitation, permafrost and wildfire.  These simulations use different Global Circulation Models (GCMs), such as the National Center for Atmospheric Research Community Climate System Model 4.0 (NCAR-CCSM4) model.  The GCMs use Representative Concentration Pathways (RCPs) to compare different future greenhouse gas emissions scenarios.  Compared to current emissions, RCP 4.5 is consistent with reduced emissions, RCP 8.5 is consistent with (and possibly higher than) current emissions trajectories, and RCP 6.0 is between these two trajectories. <nuxt-link :to="{ name: 'about' }"
            >Read more about models and RCPs.</nuxt-link
          >
        </p>
        </div>
        <h4 class="title is-4">Contents</h4>
        <div class="content is-size-5">
          <ul>
            <li>
              <a href="#temperature">Temperature</a> charts and tables with
              multiple models and scenarios, grouped decadally and into mid/late
              century
            </li>
            <li>
              <a href="#precipitation">Precipitation</a> charts and tables with
              multiple models and scenarios, grouped decadally and into mid/late
              century
            </li>
            <li>
              <a href="#permafrost">Permafrost</a> with specific visualizations
              depending on the presence or absence of permafrost
            </li>
            <li>
              <a href="#data-overview-download">Data overview &amp; download</a>
              with notes on interpreting these visualizations and a button to
              click to get a CSV of data
            </li>
          </ul>
        </div>
      </section>
      <section class="section">
        <div class="report-type-wrapper" id="temperature">
          <TempReport />
        </div>
        <BackToTopButton />
      </section>
      <section class="section">
        <div class="report-type-wrapper" id="precipitation">
          <PrecipReport />
        </div>
        <BackToTopButton />
      </section>
      <section class="section">
        <div class="report-type-wrapper" id="permafrost">
          <PermafrostReport />
        </div>
        <BackToTopButton />
      </section>
        <DownloadCsvButton />
        <BackToTopButton />
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
import BackToTopButton from '~/components/reports/BackToTopButton'
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
    BackToTopButton,
  },
  data() {
    return {
      units: 'imperial',
    }
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
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
