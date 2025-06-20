<template>
  <div id="results" class="container">
    <div v-if="$fetchState.pending" class="loading">
      <!-- Drama dots -->
      <h3 class="title is-3">
        Loading data for <span v-html="place" />&hellip;
      </h3>
      <div class="content is-size-4">
        <p>Hang on, this could take a few minutes!</p>
      </div>
      <b-progress type="is-info"></b-progress>
    </div>
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
        <MiniMap :polystyle="polystyle" />
        <QualitativeText />
      </section>
      <section class="section content pb-0 is-hidden-touch" v-if="dataPresent">
        <h3 class="title is-3">Introduction</h3>
        <div class="is-size-5">
          <p>
            <span v-if="type == 'latLng'"
              >The <span v-if="climateData">tables and </span>charts below are
              specific to the gridded data extracted at
              <span v-html="place"></span>, indicated by a marker on the map
              above. {{ hucPolyExplanation }}</span
            >
            <span v-else-if="type == 'community'"
              >The <span v-if="climateData">tables and </span>charts below are
              specific to the gridded data extracted from the location of
              <span v-html="place"></span>, indicated by a marker on the map
              above. {{ hucPolyExplanation }}</span
            >
            <span v-else
              >Data for the tables and charts below have been averaged across
              the spatial extent of {{ grammarFragment }} {{ place }}.</span
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
          <p v-if="elevationWarning">
            <b-icon icon="alert" type="is-warning" />
            There is likely significant elevation variation
            <span v-if="type == 'latLng' || type == 'community'">near</span
            ><span v-else>in</span> this place. The data shown below represent
            an average which may differ from specific sites near here. Consider
            elevation when interpreting these results.
          </p>
          <div v-if="!isPointLocation" class="area-warning">
            <p>
              <strong>Note</strong>: for large areas such as climate divisions,
              ethnolinguistic regions, or large protected areas, averaging
              future climate conditions and changes can mask important variation
              within the region. This is especially true for variables such as
              snowpack or permafrost and for any variable in mountainous
              regions.
            </p>
            <p>
              Apply contextual and local knowledge to assess ecological
              variability over large areas. To do this using this tool you may
              wish to select a report for the larger region of interest and then
              select reports for multiple smaller representative regions within
              the original area to highlight the overarching conditions as well
              as smaller scale variation.
            </p>
          </div>
          <p>
            The sections below show output from different scientific simulations
            of possible future conditions for {{ presentDataTypesString }}.
            These simulations use different
            <strong>Global Climate Models (GCMs)</strong>&mdash;climate
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
          <span v-if="climateData">
            <p>Some of the data has been averaged by season.</p>
            <ul class="mb-5">
              <li>
                <strong>Winter</strong> is December, January and February,
              </li>
              <li><strong>Spring</strong> is March, April and May,</li>
              <li><strong>Summer</strong> is June, July and August,</li>
              <li><strong>Fall</strong> is September, October and November.</li>
            </ul>
          </span>
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
            icon in the upper&ndash;right of charts to get a hi-res download.
          </p>
          <p>
            You can display these visualizations in Imperial or metric units.
          </p>
        </div>
        <div>
          <b-field label="Units">
            <b-radio v-model="units" name="units" native-value="imperial">
              Imperial
            </b-radio>
            <b-radio v-model="units" name="units" native-value="metric">
              Metric
            </b-radio>
          </b-field>
        </div>
      </section>
      <section class="section content is-hidden-touch" v-if="dataPresent">
        <h4 class="title is-4" id="toc">Contents</h4>
        <div class="is-size-5">
          <ul>
            <li v-if="climateData">
              <a href="#temperature">Temperature</a> charts and tables with
              multiple models and scenarios, grouped decadally and into mid/late
              century
            </li>
            <li v-if="climateData">
              <a href="#precipitation">Precipitation</a> charts and tables with
              multiple models and scenarios, grouped decadally and into mid/late
              century
            </li>
            <li v-if="hydrologyData">
              <a href="#hydrology">Hydrology</a> charts with multiple variables,
              models, and scenarios, grouped decadally and by month of the year.
            </li>
            <li v-if="permafrostData || showPermafrostForArea">
              <a href="#permafrost">Permafrost</a> with specific visualizations
              depending on the presence or absence of permafrost
            </li>
            <li v-if="flammabilityData || vegChangeData">
              <a href="#wildfire">Wildfire</a> charts of
              {{ wildfireDataSubstring }} with multiple models and scenarios
            </li>
            <li v-if="beetleData">
              <a href="#climate-protection-beetles"
                >Climate Protection from Spruce Beetles</a
              >
              visualizes the climate&ndash;related protection from spruce
              beetles in forested areas of Alaska
            </li>
            <li v-if="demographicsData">
              <a href="#demographics">Demographic and Health information</a>
              for this place, derived from data from the U.S. Census and the
              Centers for Disease Control and Prevention (CDC)
            </li>
          </ul>
        </div>
      </section>
      <section class="section content py-0 is-hidden-touch" v-if="dataMissing">
        <div class="is-size-5">
          <div v-if="!dataPresent" class="pb-3">
            <h3 class="title is-3">
              We&rsquo;re sorry, but this place is outside of our data.
            </h3>
            <div class="content is-size-4">
              <p>
                Each dataset covers different places, but unfortunately this
                place has no data.
              </p>
              <p>
                Maybe we can help you find what you&rsquo;re looking for? Email
                us at
                <a href="mailto:uaf-snap-data-tools@alaska.edu"
                  >uaf-snap-data-tools@alaska.edu</a
                >
                with what you need!
              </p>
            </div>
          </div>
          <p
            class="no-data mt-6"
            v-if="uniformHttpError && uniformHttpError != 'no_data'"
          >
            {{ httpErrors[uniformHttpError] }}
            }
          </p>
          <div v-if="dataPresent && dataMissing && uniformHttpError == null">
            The following data is not available at this location:
            <ul class="mb-5">
              <li v-if="climateHttpError">
                <strong>Temperature and precipitation:</strong>
                {{ httpErrors[climateHttpError] }}
              </li>
              <li v-if="type != 'community' && type != 'latLng'">
                <strong>Hydrology:</strong>
                Data are not averaged over areas
              </li>
              <li v-else-if="hydrologyHttpError">
                <strong>Hydrology:</strong>
                {{ httpErrors[hydrologyHttpError] }}
              </li>
              <li v-if="elevationHttpError">
                <strong>Elevation:</strong>
                {{ httpErrors[elevationHttpError] }}
              </li>
              <li v-if="permafrostHttpError && !showPermafrostForArea">
                <strong>Permafrost:</strong>
                {{ httpErrors[permafrostHttpError] }}
              </li>
              <li v-else-if="!showPermafrostForArea">
                <strong>Permafrost:</strong>
                Not supported for this area
              </li>
              <li v-if="flammabilityHttpError">
                <strong>Flammability:</strong>
                {{ httpErrors[flammabilityHttpError] }}
              </li>
              <li v-if="vegChangeHttpError">
                <strong>Vegetation change:</strong>
                {{ httpErrors[vegChangeHttpError] }}
              </li>
              <li v-if="beetleHttpError">
                <strong>Beetle climate protection:</strong>
                {{ httpErrors[beetleHttpError] }}
              </li>
              <li v-if="demographicsHttpError">
                <strong>Demographics:</strong>
                {{ httpErrors[demographicsHttpError] }}
              </li>
            </ul>
            <p>
              Please reach out to us via email at
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >
              if you have questions.
            </p>
          </div>
        </div>
      </section>
      <section class="section is-hidden-touch" v-if="climateData">
        <div id="temperature">
          <TempReport />
        </div>
      </section>
      <section class="section is-hidden-touch" v-if="climateData">
        <div id="precipitation">
          <PrecipReport />
        </div>
      </section>
      <section class="section is-hidden-touch" v-if="hydrologyData">
        <div id="hydrology">
          <HydrologyReport />
        </div>
      </section>
      <section
        class="section is-hidden-touch"
        v-if="permafrostData || (dataPresent && showPermafrostForArea)"
      >
        <div id="permafrost">
          <PermafrostReport />
        </div>
      </section>
      <section
        class="section is-hidden-touch"
        v-if="flammabilityData || vegChangeData"
      >
        <div id="wildfire">
          <WildfireReport />
        </div>
      </section>
      <section class="section is-hidden-touch" v-if="beetleData">
        <div id="climate-protection-beetles">
          <BeetleRiskReport />
          <BackToTopButton />
        </div>
      </section>
      <section class="section is-hidden-touch" v-if="demographicsData">
        <div id="demographics">
          <DemographicsReport />
          <BackToTopButton />
        </div>
      </section>
      <section
        class="section is-hidden-fullhd is-hidden-widescreen is-hidden-desktop"
      >
        <div class="is-size-5">
          <span class="centered"
            ><b-icon icon="monitor" size="is-medium" />&nbsp;&nbsp;To view
            additional charts, tables, and data, please view this URL on a
            desktop computer with a wider display.</span
          >
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  width: 40em;
  margin: 5rem auto;
}
.area-warning {
  border-left: 0.25rem solid #aaa;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
.centered {
  text-align: center;
}
.back {
  margin-bottom: 2rem;
}
::v-deep .b-radio.radio:not(.button) {
  margin-right: 1.5rem;
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
.no-data {
  font-size: 1.55rem;
  text-align: center;
}
</style>

<script>
import TempReport from '~/components/reports/temperature/TempReport'
import PrecipReport from '~/components/reports/precipitation/PrecipReport'
import PermafrostReport from '~/components/reports/permafrost/PermafrostReport'
import WildfireReport from '~/components/reports/wildfire/WildfireReport'
import BeetleRiskReport from '~/components/reports/beetles/BeetleRiskReport'
import DemographicsReport from '~/components/reports/demographics/DemographicsReport'
import HydrologyReport from '~/components/reports/hydrology/HydrologyReport'
import MiniMap from '~/components/reports/MiniMap'
import QualitativeText from '~/components/reports/QualitativeText'
import BackToTopButton from '~/components/reports/BackToTopButton'
import { mapGetters } from 'vuex'
import { httpErrors } from '../utils/http_errors'
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
    BeetleRiskReport,
    HydrologyReport,
    DemographicsReport,
    MiniMap,
    QualitativeText,
    BackToTopButton,
  },
  data() {
    return {
      units: 'imperial',
      httpErrors: httpErrors,
      hucPolyExplanation:
        'The shaded region on the map is the nearest watershed (hydrological unit, level 12) and is only used to summarize wildfire data around this place.',
    }
  },
  computed: {
    // Returns grammar fragments needed to improve
    // readability of the report for different place types.
    grammarFragment() {
      switch (this.type) {
        case 'protected_area':
        case 'corporation':
        case 'climate_division':
        case 'fire_zone':
        case 'borough':
        case 'census_area':
          return 'the'
          break
        default:
          return ''
      }
    },
    elevationUnits() {
      return this.units == 'imperial' ? 'ft' : 'm'
    },
    dataPresent() {
      let types = this.presentDataTypes()
      if (types.length == 0) {
        return false
      }
      return true
    },
    dataMissing() {
      // Get an array of data types present for the selected location
      // (Temperature, Permafrost, Beetle Climate Protection, etc.)
      let types = this.presentDataTypes()

      // Ignore permafrost when considering if all datasets exist because the
      // permafrost maps/section will be displayed regardless.
      types = _.without(types, 'permafrost')

      // If there are less than 8 data types present, the corresponding
      // section(s) of the report page will be hidden.
      if (types.length < 7) {
        return true
      }
      return false
    },
    uniformHttpError() {
      let returnError = null
      let apiHttpErrors = [
        this.climateHttpError,
        this.elevationHttpError,
        this.permafrostHttpError,
        this.flammabilityHttpError,
        this.vegChangeHttpError,
        this.beetleHttpError,
        this.hydrologyHttpError,
        this.demographicsHttpError,
      ]

      if (this.type == 'latLng') {
        apiHttpErrors.push(this.permafrostHttpError)
      }

      apiHttpErrors.forEach(error => {
        let uniform = apiHttpErrors.every(err => err == error)
        if (uniform) {
          returnError = error
        }
      })
      return returnError
    },
    presentDataTypesString() {
      let types = this.presentDataTypes()
      return this.formatTypeString(types)
    },
    // If it's a point-based place, the associated HUC12
    // should be a bit quieter.  If it's a polygon-based place,
    // it should be 'vivid' (more pronounced).  Used in MiniMap.
    // the polygon.
    polystyle() {
      if (this.type == 'latLng' || this.type == 'community') {
        return '' // uses default calm MiniMap style
      }
      return 'vivid'
    },
    ...mapGetters({
      place: 'place/name',
      type: 'place/type',
      elevation: 'elevation/elevation',
      elevationWarning: 'elevation/elevationWarning',
      climateData: 'climate/climateData',
      indicatorData: 'indicators/indicatorData',
      permafrostData: 'permafrost/permafrostData',
      flammabilityData: 'wildfire/flammability',
      vegChangeData: 'wildfire/veg_change',
      beetleData: 'beetle/beetleData',
      hydrologyData: 'hydrology/hydrologyData',
      demographicsData: 'demographics/demographicsData',
      climateHttpError: 'climate/httpError',
      elevationHttpError: 'elevation/httpError',
      permafrostHttpError: 'permafrost/httpError',
      flammabilityHttpError: 'wildfire/flammabilityHttpError',
      vegChangeHttpError: 'wildfire/vegChangeHttpError',
      wildfireDataSubstring: 'wildfire/wildfireDataSubstring',
      beetleHttpError: 'beetle/httpError',
      hydrologyHttpError: 'hydrology/httpError',
      demographicsHttpError: 'demographics/httpError',
      isPointLocation: 'place/isPointLocation',
      showPermafrostForArea: 'permafrost/showPermafrostForArea',
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
    await this.$store.dispatch('hydrology/fetch').catch(e => {
      console.error(e)
    })
    await this.$store.dispatch('wildfire/fetch').catch(e => {
      console.error(e)
    })
    await this.$store.dispatch('indicators/fetch').catch(e => {
      console.error(e)
    })
    await this.$store.dispatch('elevation/fetch').catch(e => {
      console.error(e)
    })
    await this.$store.dispatch('beetle/fetch').catch(e => {
      console.error(e)
    })
    await this.$store.dispatch('demographics/fetch').catch(e => {
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
  methods: {
    presentDataTypes() {
      let types = []
      if (this.climateData) {
        types.push('temperature', 'precipitation')
      }
      if (this.hydrologyData) {
        types.push('hydrology')
      }
      if (this.permafrostData) {
        types.push('permafrost')
      }
      if (this.flammabilityData) {
        types.push('flammability')
      }
      if (this.vegChangeData) {
        types.push('vegetation change')
      }
      if (this.beetleData) {
        types.push('climate protection from spruce beetle outbreaks')
      }
      if (this.demographicsData) {
        types.push('demographics')
      }
      return types
    },
    formatTypeString(types) {
      if (types.length == 0) {
        return null
      }
      if (types.length == 1) {
        return types[0]
      }
      if (types.length == 2) {
        return types[0] + ' and ' + types[1]
      }
      let allButLast = types.slice(0, -1)
      let last = types.slice(-1)[0]
      let string = allButLast.join(', ')
      string = string + ', and ' + last
      return string
    },
  },
}
</script>
