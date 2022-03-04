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
    <section v-if="$fetchState.pending" class="section content">
      <!-- Drama dots -->
      <h4 class="title is-5">Loading data for <span v-html=place />&hellip;</h4>
      <b-progress type="is-info"></b-progress>
    </section>
    <section v-else-if="$fetchState.error" class="section content error">
      <p class="is-size-5">
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
    </section>
    <div v-else>
      <!-- The report! -->
      <section class="section">
        <h3 class="title is-3 centered">
          Projected Conditions for <span v-html="place"></span>
        </h3>
        <MiniMap />
        <QualitativeText />
      </section>
      <section class="section content">
        <h3 class="title is-3">Introduction</h3>
        <div class="is-size-5">
          <p>
            <span v-if="type == 'latLng'"
              >The tables and charts below are specific to the gridded data
              extracted at <span v-html="place"></span>.</span
            >
            <span v-else-if="type == 'community'"
              >The tables and charts below are specific to the gridded data
              extracted from the location of <span v-html="place"></span>.</span
            >
            <span v-else
              >Data for the tables and charts below have been averaged across
              the spatial extent of {{ place }}.</span
            >
          </p>
          <p v-if="elevation">
            The average (mean) elevation
            <span v-if="type == 'latLng' || type == 'community'"
              >near this point</span
            ><span v-else>of this area</span> is {{ elevation.mean
            }}{{ elevationUnits }} above sea level. The minimum elevation is
            {{ elevation.min }}{{ elevationUnits }} and the maximum elevation is
            {{ elevation.max }}{{ elevationUnits }}, which should be kept in
            mind when interpreting these results.
          </p>
          <p>
            The sections below show output from different scientific simulations
            of possible future conditions for temperature, precipitation,
            permafrost and wildfire. These simulations use different
            <strong>Global Circulation Models (GCMs)</strong>&mdash;climate
            models&mdash;such as the National Center for Atmospheric Research
            Community Climate System Model 4.0 (NCAR CCSM4).
          </p>
          <p>
            These climate models use
            <strong>Representative Concentration Pathways (RCPs)</strong> to
            compare different future greenhouse gas emissions scenarios.
            Compared to current emissions RCP 4.5 is a scenario representing a
            reduction in global emissions, while RCP 8.5 represents a scenario
            similar to, or possibly higher than, current global emissions
            trajectories. RCP 6.0 is between these two trajectories.
            <nuxt-link :to="{ name: 'about' }"
              >Read more about climate models and RCPs.</nuxt-link
            >
          </p>
          <p>Some of these data have been averaged by season.</p>
          <ul>
            <li><strong>Winter</strong> is December, January and February,</li>
            <li><strong>Spring</strong> is March, April and May,</li>
            <li><strong>Summer</strong> is June, July and August,</li>
            <li><strong>Fall</strong> is September, October and November.</li>
          </ul>
          <p>
            Click the
            <span class="camera-icon">
              <svg
                viewBox="0 0 1000 1000"
                class="icon"
                height="1em"
                width="1em"
              >
                <path
                  d="m500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z"
                  transform="matrix(1 0 0 -1 0 850)"
                ></path>
              </svg>
            </span>
            icon in the upper&ndash;right of the chart to download it.
          </p>
          <p>
            You can display these visualizations in Imperial or metric units.
          </p>
        </div>
        <div class="pb-6">
          <b-field label="Units">
            <b-radio v-model="units" name="units" native-value="imperial">
              Imperial
            </b-radio>
            <b-radio v-model="units" name="units" native-value="metric">
              Metric
            </b-radio>
          </b-field>
        </div>
        <h4 class="title is-4" id="toc">Contents</h4>
        <div class="is-size-5">
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
              <a href="#wildfire">Wildfire</a> charts of relative flammability
              and vegetation change with with multiple models and scenarios
            </li>
          </ul>
        </div>
      </section>
      <section class="section">
        <div id="temperature">
          <TempReport />
        </div>
        <BackToTopButton />
      </section>
      <section class="section">
        <div id="precipitation">
          <PrecipReport />
        </div>
        <BackToTopButton />
      </section>
      <section class="section">
        <div id="permafrost">
          <PermafrostReport />
        </div>
        <BackToTopButton />
      </section>
      <section class="section">
        <div id="wildfire">
          <WildfireReport />
        </div>
        <BackToTopButton />
      </section>
      <DownloadCsvButton />
      <BackToTopButton />
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
.back {
  margin-bottom: 2rem;
}
.b-radio.radio:not(.button) {
  margin-right: 1rem;
}
.camera-icon {
  display: inline-block;
  position: relative;
  top: 0.25rem;
  padding: 0 3px;

  & path {
    fill: #ccc;
  }
}
</style>

<script>
import TempReport from '~/components/reports/temperature/TempReport'
import PrecipReport from '~/components/reports/precipitation/PrecipReport'
import PermafrostReport from '~/components/reports/permafrost/PermafrostReport'
import WildfireReport from '~/components/reports/wildfire/WildfireReport'
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
    WildfireReport,
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
    elevationUnits() {
      return this.units == 'imperial' ? 'ft' : 'm'
    },
    ...mapGetters({
      place: 'place/name',
      type: 'place/type',
      elevation: 'elevation/elevation',
    }),
  },
  // This component initiates the data fetching so that
  // error handling, etc, can all be done in one spot.
  async fetch() {
    // TODO: Error handling.
    await this.$store.dispatch('climate/fetch').catch(e => {
      console.error(e)
    })
    await this.$store.dispatch('permafrost/fetch').catch(e => {
      console.error(e)
    })
    await this.$store.dispatch('wildfire/fetch').catch(e => {
      console.error(e)
    })
    this.$store.dispatch('elevation/fetch').catch(e => {
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
