<template>
  <div class="print-report">
    <!-- Screen-only toolbar; hidden when printing. -->
    <div class="print-toolbar">
      <div class="print-toolbar--inner">
        <nuxt-link v-if="placeKey" :to="reportPath" class="print-toolbar--back"
          >&larr; Interactive report</nuxt-link
        >
        <span class="print-toolbar--status" :class="{ ready: ready }">
          <span v-if="$fetchState.pending">Loading data&hellip;</span>
          <span v-else-if="$fetchState.error || !placeKey">Not available</span>
          <span v-else-if="!ready"
            >Drawing maps &amp; charts<span v-if="pendingTiles">
              ({{ pendingTiles }} tiles to go)</span
            >&hellip;</span
          >
          <span v-else>Ready to print</span>
        </span>
        <b-field class="print-toolbar--units">
          <b-radio-button
            v-model="units"
            native-value="imperial"
            size="is-small"
            type="is-light"
            >Imperial</b-radio-button
          >
          <b-radio-button
            v-model="units"
            native-value="metric"
            size="is-small"
            type="is-light"
            >Metric</b-radio-button
          >
        </b-field>
        <b-button
          type="is-primary"
          icon-left="file-pdf-box"
          :disabled="!ready"
          @click="print"
          >Save as PDF</b-button
        >
      </div>
      <p class="print-toolbar--hint">
        Model and scenario choices you make below are used in the PDF. In the
        print dialog, choose <strong>Save as PDF</strong> as the destination.
      </p>
    </div>

    <div class="sheets">
      <section v-if="!placeKey" class="sheet sheet--message">
        <h2>No place selected</h2>
        <p>
          <nuxt-link to="/">Choose a place</nuxt-link> to build a printable
          report.
        </p>
      </section>

      <section v-else-if="$fetchState.pending" class="sheet sheet--message">
        <h2>Building your report&hellip;</h2>
        <p>Hang on, gathering data can take a few minutes.</p>
        <b-progress type="is-info"></b-progress>
      </section>

      <section v-else-if="$fetchState.error" class="sheet sheet--message">
        <h2>Something&rsquo;s amiss</h2>
        <p>The report for this place couldn&rsquo;t be loaded.</p>
      </section>

      <template v-else>
        <!-- Cover -->
        <section class="sheet sheet--cover">
          <div class="cover--band">
            <div class="cover--brand">Northern Climate Reports</div>
            <div class="cover--brand-sub">
              Climate projections for changing Arctic ecosystems
            </div>
          </div>
          <div class="cover--eyebrow">{{ placeTypeLabel }}</div>
          <h1 class="cover--title">
            Projected Conditions for <span v-html="place"></span>
          </h1>
          <div class="cover--grid">
            <div class="cover--map">
              <MiniMap ref="minimap" :polystyle="polystyle" />
            </div>
            <dl class="cover--facts">
              <template v-if="latLng">
                <dt>Location</dt>
                <dd>{{ coordinates }}</dd>
              </template>
              <template v-if="elevation">
                <dt>Elevation</dt>
                <dd>
                  {{ elevation.mean }}&#8239;{{ elevationUnits }} mean
                  <span class="muted"
                    >({{ elevation.min }}&ndash;{{ elevation.max }}&#8239;{{
                      elevationUnits
                    }})</span
                  >
                </dd>
              </template>
              <template v-if="demographicsData">
                <dt>Population</dt>
                <dd>{{ commas(demographicsData.place.total_population) }}</dd>
              </template>
              <dt>Units</dt>
              <dd>{{ unitsLabel }}</dd>
              <dt>Report generated</dt>
              <dd>{{ generatedDate }}</dd>
              <dt>Online version</dt>
              <dd class="cover--link">
                <a :href="permalink">{{ permalinkDisplay }}</a>
              </dd>
            </dl>
          </div>
          <div class="cover--footer">
            <p>
              Warming temperatures, thawing permafrost, and more wildfires are
              changing landscapes across the North. This report collects the
              climate model projections, maps, and tables available for this
              place.
            </p>
            <img
              src="~/assets/images/UAFLogo_A_black_horiz.svg"
              alt="University of Alaska Fairbanks"
              class="cover--logo"
            />
          </div>
        </section>

        <!-- Summary + key numbers -->
        <section class="sheet">
          <header class="sheet--header">
            <div class="sheet--kicker">Overview</div>
            <h2>Summary</h2>
          </header>
          <QualitativeText class="print-summary" />

          <div v-if="glanceStats.length" class="stats">
            <div v-for="stat in glanceStats" :key="stat.label" class="stat">
              <div class="stat--value" v-html="stat.value"></div>
              <div class="stat--label">{{ stat.label }}</div>
              <div
                class="stat--detail"
                v-if="stat.detail"
                v-html="stat.detail"
              ></div>
            </div>
          </div>

          <div v-if="climateData" class="glance">
            <h3>At a glance: seasonal change</h3>
            <table class="glance--table">
              <thead>
                <tr>
                  <th scope="col" class="left">Season</th>
                  <th scope="col">Historical<br />1950&ndash;2009</th>
                  <th scope="col">Mid&ndash;century<br />2040&ndash;2069</th>
                  <th scope="col">Late century<br />2070&ndash;2099</th>
                  <th scope="col">Change by<br />2070&ndash;2099</th>
                </tr>
              </thead>
              <tbody
                v-for="group in glanceTable"
                :key="group.label"
                class="glance--group"
              >
                <tr class="glance--group-label">
                  <th colspan="5" scope="colgroup" class="left">
                    {{ group.label }}
                    <span class="muted">({{ group.units }})</span>
                  </th>
                </tr>
                <tr v-for="row in group.rows" :key="row.season">
                  <th scope="row" class="left">{{ row.season }}</th>
                  <td v-html="row.historical"></td>
                  <td v-html="row.mid"></td>
                  <td v-html="row.late"></td>
                  <td :class="row.changeClass" v-html="row.change"></td>
                </tr>
              </tbody>
            </table>
            <p class="footnote">
              Projected ranges span the MRI CGCM3 and NCAR CCSM4 models under
              lower (RCP 4.5) and higher (RCP 8.5) emissions, the same values
              shown in the temperature and precipitation tables in this report.
              Precipitation change is shown as a percentage of the historical
              mean.
            </p>
          </div>
        </section>

        <!-- About this report (flows on from the summary when printed) -->
        <section class="sheet sheet--continue">
          <header class="sheet--header">
            <div class="sheet--kicker">Overview</div>
            <h2>About this report</h2>
          </header>
          <div class="prose">
            <p v-if="isPointLocation">
              The tables and charts in this report are specific to the gridded
              data extracted at <span v-html="place"></span>, indicated by a
              marker on the map. The shaded region on the map is the nearest
              watershed (hydrological unit, level 12) and is only used to
              summarize wildfire data around this place.
            </p>
            <p v-else>
              Data for the tables and charts in this report have been averaged
              across the spatial extent of {{ grammarFragment }}
              <span v-html="place"></span>.
            </p>
            <p v-if="elevation">
              The average (mean) elevation
              <span v-if="isPointLocation">near this point</span
              ><span v-else>of this area</span> is {{ elevation.mean }}&#8239;{{
                elevationUnits
              }}
              above sea level. The minimum elevation is
              {{ elevation.min }}&#8239;{{ elevationUnits }} and the maximum is
              {{ elevation.max }}&#8239;{{ elevationUnits }}, which should be
              kept in mind when interpreting these results.
            </p>
            <p v-if="elevationWarning" class="callout">
              There is likely significant elevation variation
              <span v-if="isPointLocation">near</span><span v-else>in</span>
              this place. The data shown represent an average which may differ
              from specific sites nearby.
            </p>
            <p v-if="!isPointLocation" class="callout">
              For large areas, averaging future climate conditions can mask
              important variation within the region, especially for snowpack,
              permafrost, and any variable in mountainous terrain. Apply local
              and contextual knowledge when interpreting these results.
            </p>
            <p>
              The sections that follow show output from scientific simulations
              of possible future conditions. These simulations use different
              <strong>Global Climate Models (GCMs)</strong>, such as the
              National Center for Atmospheric Research Community Climate System
              Model 4.0 (NCAR CCSM4), run under
              <strong>Representative Concentration Pathways (RCPs)</strong>
              that describe different future greenhouse gas emissions. RCP 4.5
              represents a reduction in global emissions, RCP 8.5 is similar to
              or possibly higher than current emissions trajectories, and RCP
              6.0 falls between the two.
            </p>
            <p v-if="climateData">
              Some data are averaged by season: <strong>winter</strong> is
              December&ndash;February, <strong>spring</strong> is
              March&ndash;May, <strong>summer</strong> is June&ndash;August, and
              <strong>fall</strong> is September&ndash;November.
            </p>
          </div>

          <h3 class="contents--title">Contents</h3>
          <ol class="contents">
            <li v-for="s in sections" :key="s.id">
              <span class="contents--name">{{ s.title }}</span>
              <span class="contents--blurb">{{ s.blurb }}</span>
            </li>
          </ol>

          <div v-if="unavailable.length" class="unavailable">
            <h3>Not available for this place</h3>
            <ul>
              <li v-for="item in unavailable" :key="item.label">
                <strong>{{ item.label }}:</strong> {{ item.reason }}
              </li>
            </ul>
          </div>
        </section>

        <!-- Data sections -->
        <section
          v-for="s in sections"
          :key="s.id"
          class="sheet sheet--data"
          :id="'print-' + s.id"
        >
          <header class="sheet--header">
            <div class="sheet--kicker">
              Section {{ s.number }} of {{ sections.length }}
            </div>
            <h2>{{ s.title }}</h2>
          </header>

          <template v-if="s.id == 'temperature'">
            <p class="lede">
              Projections for average (mean) temperature compared with the
              historical range (1950&ndash;2009, CRU TS 4.0). Results are
              averaged by season for two climate models (MRI CGCM3 and NCAR
              CCSM4) and the average of five models which perform well in Alaska
              and the Arctic.
            </p>
            <figure
              v-for="(name, season) in seasonNames"
              :key="season"
              class="figure figure--chart"
            >
              <ReportTempChart
                :season="season"
                :chartId="'print-temp-' + season + '-chart'"
              />
            </figure>
            <div class="figure"><ReportTempTable /></div>
            <ReportTempIndicatorsTable />
          </template>

          <template v-else-if="s.id == 'precipitation'">
            <p class="lede">
              Projections for average (mean) precipitation compared with the
              historical range (1950&ndash;2009, CRU TS 4.0), averaged by season
              for two climate models (MRI CGCM3 and NCAR CCSM4) and a
              five&ndash;model average.
              <strong
                >Models have higher uncertainty with regard to
                precipitation.</strong
              >
            </p>
            <figure
              v-for="(name, season) in seasonNames"
              :key="season"
              class="figure figure--chart"
            >
              <ReportPrecipChart
                :season="season"
                :chartId="'print-precip-' + season + '-chart'"
              />
            </figure>
            <div class="figure"><ReportPrecipTable /></div>
            <ReportPrecipIndicatorsTable />
          </template>

          <component v-else :is="s.component" class="reused" />
        </section>

        <!-- Back matter -->
        <section class="sheet sheet--back">
          <header class="sheet--header">
            <div class="sheet--kicker">About</div>
            <h2>Northern Climate Reports</h2>
          </header>
          <div class="prose">
            <p>
              Developed by the Scenarios Network for Alaska + Arctic Planning
              (SNAP) at the International Arctic Research Center, University of
              Alaska Fairbanks. Funding was provided by the Alaska Climate
              Adaptation Science Center and the United States Geological Survey.
            </p>
            <p>
              Portions of this tool were developed in collaboration with the
              University of Alaska Anchorage Institute for Circumpolar Health
              Studies and the University of Washington Center for Disaster
              Resilient Communities. Development was partially funded by EPA
              Grant Number R840479.
            </p>
            <p>
              Usage of data provided through this tool is subject to license
              constraints. Full dataset descriptions, citations, and licenses
              are available at
              <a href="https://northernclimatereports.org/data"
                >northernclimatereports.org/data</a
              >.
            </p>
            <p>
              Questions or comments? Contact
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >.
            </p>
            <p class="muted">
              Explore the interactive version of this report, with additional
              models and scenarios and downloadable CSV data, at
              <a :href="permalink">{{ permalinkDisplay }}</a
              >.
            </p>
          </div>
          <img
            src="~/assets/images/UAFLogo_A_black_horiz.svg"
            alt="University of Alaska Fairbanks"
            class="back--logo"
          />
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import deepdash from 'deepdash'
import { mapGetters } from 'vuex'
import MiniMap from '~/components/reports/MiniMap'
import QualitativeText from '~/components/reports/QualitativeText'
import ReportTempChart from '~/components/reports/temperature/ReportTempChart'
import ReportTempTable from '~/components/reports/temperature/ReportTempTable'
import ReportTempIndicatorsTable from '~/components/reports/temperature/ReportTempIndicatorsTable'
import ReportPrecipChart from '~/components/reports/precipitation/ReportPrecipChart'
import ReportPrecipTable from '~/components/reports/precipitation/ReportPrecipTable'
import ReportPrecipIndicatorsTable from '~/components/reports/precipitation/ReportPrecipIndicatorsTable'
import HydrologyReport from '~/components/reports/hydrology/HydrologyReport'
import PermafrostReport from '~/components/reports/permafrost/PermafrostReport'
import WildfireReport from '~/components/reports/wildfire/WildfireReport'
import BeetleRiskReport from '~/components/reports/beetles/BeetleRiskReport'
import DemographicsReport from '~/components/reports/demographics/DemographicsReport'
import { formatting } from '~/mixins/formatting'
import { httpErrors } from '~/utils/http_errors'

// Adds the deep methods (e.g. _.mapValuesDeep) to lodash that the stores
// and report components rely on, as Report.vue does.
const _ = deepdash(lodash)

// Public site, used for links printed in the PDF.
const SITE_URL = 'https://northernclimatereports.org'

// Models & scenarios summarized in the "at a glance" numbers; these
// match the columns of the temperature and precipitation tables.
const GLANCE_MODELS = ['MRI-CGCM3', 'CCSM4']
const GLANCE_SCENARIOS = ['rcp45', 'rcp85']

const PLACE_TYPE_LABELS = {
  latLng: 'Point location',
  community: 'Community',
  huc: 'Watershed',
  yt_watershed: 'Yukon watershed',
  protected_area: 'Protected area',
  corporation: 'Native corporation',
  climate_division: 'Climate division',
  ethnolinguistic_region: 'Ethnolinguistic region',
  fire_zone: 'Fire management zone',
  yt_fire_district: 'Yukon fire district',
  first_nation: 'First Nation traditional territory',
  game_management_unit: 'Game management unit',
  yt_game_management_subzone: 'Yukon game management subzone',
  borough: 'Borough',
  census_area: 'Census area',
  ecoregion: 'Ecoregion',
}

// Formats a number with a real minus sign and optional leading plus.
const fmt = function (value, digits, signed = false) {
  let text = Math.abs(value).toFixed(digits)
  if (value < 0 && Number(text) != 0) {
    return '&minus;' + text
  }
  return signed && Number(text) != 0 ? '&plus;' + text : text
}

export default {
  name: 'PrintReport',
  mixins: [formatting],
  components: {
    MiniMap,
    QualitativeText,
    ReportTempChart,
    ReportTempTable,
    ReportTempIndicatorsTable,
    ReportPrecipChart,
    ReportPrecipTable,
    ReportPrecipIndicatorsTable,
    HydrologyReport,
    PermafrostReport,
    WildfireReport,
    BeetleRiskReport,
    DemographicsReport,
  },
  data() {
    return {
      ready: false,
      pendingTiles: 0,
      renderedAt: null,
      quietSince: null,
      generatedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      seasonNames: {
        DJF: 'Winter',
        MAM: 'Spring',
        JJA: 'Summer',
        SON: 'Fall',
      },
    }
  },
  head() {
    return {
      // Used by browsers as the default PDF file name.
      title: this.plainPlace
        ? 'Northern Climate Report - ' + this.plainPlace
        : 'Northern Climate Report',
    }
  },
  async fetch() {
    if (!this.placeKey) {
      return
    }
    await this.$store.dispatch('fetchReport')
  },
  created() {
    // Allow ?units=metric so the headless PDF script can pick units.
    if (this.$route.query.units == 'metric') {
      this.$store.commit('setMetric')
    } else if (this.$route.query.units == 'imperial') {
      this.$store.commit('setImperial')
    }
  },
  mounted() {
    this.pageStyle = document.createElement('style')
    document.head.appendChild(this.pageStyle)
    this.updatePageStyle()
    this.readinessTimer = setInterval(this.checkReadiness, 500)
  },
  beforeDestroy() {
    clearInterval(this.readinessTimer)
    this.pageStyle.remove()
    delete document.documentElement.dataset.printReady
  },
  computed: {
    ...mapGetters({
      placeKey: 'placeKey',
      storeUnits: 'units',
      place: 'place/name',
      type: 'place/type',
      latLng: 'place/latLng',
      isPointLocation: 'place/isPointLocation',
      elevation: 'elevation/elevation',
      elevationWarning: 'elevation/elevationWarning',
      climateData: 'climate/climateData',
      rawClimateData: 'climate/rawClimateData',
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
      beetleHttpError: 'beetle/httpError',
      hydrologyHttpError: 'hydrology/httpError',
      demographicsHttpError: 'demographics/httpError',
      showPermafrostForArea: 'permafrost/showPermafrostForArea',
      isLocation: 'permafrost/isLocation',
    }),
    units: {
      get() {
        return this.storeUnits
      },
      set(units) {
        this.$store.commit(units == 'metric' ? 'setMetric' : 'setImperial')
      },
    },
    unitsLabel() {
      return this.units == 'metric'
        ? 'Metric (°C, millimeters, meters)'
        : 'Imperial (°F, inches, feet)'
    },
    elevationUnits() {
      return this.units == 'imperial' ? 'ft' : 'm'
    },
    // Place name without HTML entities, for titles and page headers.
    plainPlace() {
      if (!this.place) {
        return ''
      }
      let el = document.createElement('textarea')
      el.innerHTML = this.place
      return el.value
    },
    placeTypeLabel() {
      return PLACE_TYPE_LABELS[this.type] || 'Area'
    },
    grammarFragment() {
      let needsArticle = [
        'protected_area',
        'corporation',
        'climate_division',
        'fire_zone',
        'borough',
        'census_area',
      ]
      return needsArticle.includes(this.type) ? 'the' : ''
    },
    polystyle() {
      return this.isPointLocation ? '' : 'vivid'
    },
    coordinates() {
      let lat = Number(this.latLng[0])
      let lng = Number(this.latLng[1])
      return (
        Math.abs(lat).toFixed(4) +
        '°' +
        (lat >= 0 ? 'N' : 'S') +
        ', ' +
        Math.abs(lng).toFixed(4) +
        '°' +
        (lng >= 0 ? 'E' : 'W')
      )
    },
    reportPath() {
      return '/report/' + this.placeKey
    },
    permalink() {
      return SITE_URL + this.reportPath
    },
    permalinkDisplay() {
      return this.permalink.replace(/^https:\/\//, '')
    },
    sections() {
      return [
        {
          id: 'temperature',
          title: 'Temperature',
          blurb:
            'Seasonal charts and tables for multiple models and scenarios, plus temperature indicators',
          show: this.climateData,
        },
        {
          id: 'precipitation',
          title: 'Precipitation',
          blurb:
            'Seasonal charts and tables for multiple models and scenarios, plus precipitation indicators',
          show: this.climateData,
        },
        {
          id: 'hydrology',
          title: 'Hydrology',
          blurb: 'Evapotranspiration and runoff tables and seasonal maps',
          component: 'HydrologyReport',
          show: this.hydrologyData,
        },
        {
          id: 'permafrost',
          title: 'Permafrost',
          blurb: 'Mean annual ground temperature maps and depth to permafrost',
          component: 'PermafrostReport',
          show:
            (this.permafrostData && this.isLocation) ||
            this.showPermafrostForArea,
        },
        {
          id: 'wildfire',
          title: 'Wildfire: Flammability and Vegetation',
          blurb: 'Flammability and vegetation change maps and charts',
          component: 'WildfireReport',
          show: this.flammabilityData || this.vegChangeData,
        },
        {
          id: 'beetles',
          title: 'Climate Protection from Spruce Beetles',
          blurb: 'Climate-related protection tables and maps',
          component: 'BeetleRiskReport',
          show: this.beetleData,
        },
        {
          id: 'demographics',
          title: 'Demographics and Health',
          blurb: 'U.S. Census and CDC data for this place',
          component: 'DemographicsReport',
          show: this.demographicsData,
        },
      ]
        .filter(section => section.show)
        .map((section, index) => ({ ...section, number: index + 1 }))
    },
    unavailable() {
      let reason = error => httpErrors[error] || httpErrors.no_data
      let list = []
      if (!this.climateData) {
        list.push({
          label: 'Temperature and precipitation',
          reason: reason(this.climateHttpError),
        })
      }
      if (!this.hydrologyData) {
        list.push({
          label: 'Hydrology',
          reason: this.isPointLocation
            ? reason(this.hydrologyHttpError)
            : 'Data are not averaged over areas',
        })
      }
      if (!this.sections.find(section => section.id == 'permafrost')) {
        list.push({
          label: 'Permafrost',
          reason: this.isLocation
            ? reason(this.permafrostHttpError)
            : 'Not supported for this area',
        })
      }
      if (!this.flammabilityData) {
        list.push({
          label: 'Flammability',
          reason: reason(this.flammabilityHttpError),
        })
      }
      if (!this.vegChangeData) {
        list.push({
          label: 'Vegetation change',
          reason: reason(this.vegChangeHttpError),
        })
      }
      if (!this.beetleData) {
        list.push({
          label: 'Beetle climate protection',
          reason: reason(this.beetleHttpError),
        })
      }
      if (!this.demographicsData) {
        list.push({
          label: 'Demographics',
          reason: reason(this.demographicsHttpError),
        })
      }
      return list
    },
    // Historical value + projected ranges for each season.
    glanceRows() {
      if (!this.climateData) {
        return {}
      }
      let rows = {}
      ;['tas', 'pr'].forEach(variable => {
        rows[variable] = _.map(this.seasonNames, (name, season) => {
          let histPath = [
            '1950_2009',
            season,
            'CRU-TS40',
            'CRU_historical',
            variable,
            'mean',
          ]
          let row = {
            season: name,
            historical: _.get(this.climateData, histPath),
            rawHistorical: _.get(this.rawClimateData, histPath),
          }
          ;['2040_2069', '2070_2099'].forEach(era => {
            let values = []
            let rawValues = []
            GLANCE_MODELS.forEach(model => {
              GLANCE_SCENARIOS.forEach(scenario => {
                let path = [era, season, model, scenario, variable]
                values.push(_.get(this.climateData, path))
                rawValues.push(_.get(this.rawClimateData, path))
              })
            })
            values = values.filter(_.isNumber)
            rawValues = rawValues.filter(_.isNumber)
            row[era] = {
              min: _.min(values),
              max: _.max(values),
              rawMin: _.min(rawValues),
              rawMax: _.max(rawValues),
            }
          })
          return row
        })
      })
      return rows
    },
    glanceTable() {
      if (!this.climateData) {
        return []
      }
      let metric = this.units == 'metric'
      let tempUnits = metric ? '°C' : '°F'
      let precipUnits = metric ? 'mm' : 'in'
      let precipDigits = metric ? 0 : 1
      let range = (era, digits) =>
        fmt(era.min, digits) + ' to ' + fmt(era.max, digits)
      let percent = (value, historical) =>
        Math.round((value / historical) * 100 - 100)

      let temperature = this.glanceRows.tas.map(row => {
        let late = row['2070_2099']
        let low = late.min - row.historical
        let high = late.max - row.historical
        return {
          season: row.season,
          historical: fmt(row.historical, 1),
          mid: range(row['2040_2069'], 1),
          late: range(late, 1),
          change: fmt(low, 1, true) + ' to ' + fmt(high, 1, true),
          changeClass: high > 0 ? 'warmer' : 'cooler',
        }
      })

      let precipitation = this.glanceRows.pr.map(row => {
        let late = row['2070_2099']
        let low = percent(late.rawMin, row.rawHistorical)
        let high = percent(late.rawMax, row.rawHistorical)
        return {
          season: row.season,
          historical: fmt(row.historical, precipDigits),
          mid: range(row['2040_2069'], precipDigits),
          late: range(late, precipDigits),
          change: fmt(low, 0, true) + '% to ' + fmt(high, 0, true) + '%',
          changeClass: high > 0 ? 'wetter' : 'drier',
        }
      })

      return [
        { label: 'Temperature', units: tempUnits, rows: temperature },
        {
          label: 'Precipitation',
          units: precipUnits + ' per season',
          rows: precipitation,
        },
      ]
    },
    // Headline numbers for the summary page.
    glanceStats() {
      let stats = []
      if (this.climateData) {
        let tempUnits = this.units == 'metric' ? '°C' : '°F'
        let warmest = _.maxBy(
          this.glanceRows.tas,
          row => row['2070_2099'].max - row.historical
        )
        stats.push({
          value:
            fmt(warmest['2070_2099'].max - warmest.historical, 1, true) +
            tempUnits,
          label: 'Largest seasonal warming',
          detail: warmest.season + ', by 2070&ndash;2099',
        })

        let wettest = _.maxBy(this.glanceRows.pr, row =>
          Math.abs(row['2070_2099'].rawMax / row.rawHistorical - 1)
        )
        let change = Math.round(
          (wettest['2070_2099'].rawMax / wettest.rawHistorical) * 100 - 100
        )
        stats.push({
          value: fmt(change, 0, true) + '%',
          label: 'Largest seasonal precipitation change',
          detail: wettest.season + ', by 2070&ndash;2099',
        })
      }
      if (this.elevation) {
        stats.push({
          value: this.elevation.mean + '&#8239;' + this.elevationUnits,
          label: 'Mean elevation',
          detail:
            this.elevation.min +
            '&ndash;' +
            this.elevation.max +
            '&#8239;' +
            this.elevationUnits,
        })
      }
      if (this.demographicsData) {
        stats.push({
          value: this.commas(this.demographicsData.place.total_population),
          label: 'Population',
          detail: '2020 U.S. Census',
        })
      }
      return stats
    },
  },
  watch: {
    plainPlace() {
      this.updatePageStyle()
    },
    units() {
      // Charts redraw on unit changes; wait for them again.
      this.renderedAt = Date.now()
    },
    '$fetchState.pending'(pending) {
      if (!pending) {
        this.renderedAt = Date.now()
      }
    },
  },
  methods: {
    print() {
      window.print()
    },
    // Page size, margins & running headers/footers. Injected at runtime
    // (and removed on leaving) so it only applies to this view.
    updatePageStyle() {
      let quote = text => '"' + text.replace(/["\\]/g, '\\$&') + '"'
      let box =
        'font-family: Lexend, sans-serif; font-size: 7.5pt; color: #6b7280;'
      this.pageStyle.textContent = `
        @page {
          size: letter;
          margin: 0.7in 0.5in 0.75in;
          @top-left { content: "NORTHERN CLIMATE REPORTS"; ${box} letter-spacing: 0.08em; }
          @top-right { content: ${quote(this.plainPlace)}; ${box} }
          @bottom-left { content: ${quote(
            this.permalinkDisplay + ' \u00b7 ' + this.generatedDate
          )}; ${box} }
          @bottom-right { content: "Page " counter(page) " of " counter(pages); ${box} }
        }
        @page :first {
          @top-left { content: none; }
          @top-right { content: none; }
          @bottom-left { content: none; }
          @bottom-right { content: none; }
        }
      `
    },
    // The report is "ready" once data is loaded, charts have had a moment
    // to draw, and no map tiles are still loading. Exposed on <html> so
    // the headless PDF script knows when to print.
    checkReadiness() {
      let tiles = this.$el.querySelectorAll('img.leaflet-tile')
      this.pendingTiles = Array.from(tiles).filter(
        tile => !tile.complete
      ).length
      // The cover map loads the place's boundary, which other maps use too.
      let minimap = this.$refs.minimap
      let boundaryPending = minimap && minimap.$fetchState.pending
      let now = Date.now()
      if (this.pendingTiles > 0 || !this.renderedAt || boundaryPending) {
        this.quietSince = null
      } else if (!this.quietSince) {
        this.quietSince = now
      }
      let settled =
        this.renderedAt &&
        now - this.renderedAt > 3000 &&
        this.quietSince &&
        now - this.quietSince > 1500
      // Don't wait forever on a slow or broken tile server.
      let timedOut = this.renderedAt && now - this.renderedAt > 90000
      this.ready = Boolean(
        this.placeKey &&
          !this.$fetchState.pending &&
          !this.$fetchState.error &&
          (settled || timedOut)
      )
      document.documentElement.dataset.printReady = this.ready
    },
  },
}
</script>

<style lang="scss">
// Not scoped: these rules restyle the reused report components. Everything
// is nested under .print-report so the rest of the site is unaffected.
$ink: #1f2933;
$muted: #616e7c;
$rule: #d9dee3;
$accent: #6d31f5;
$desk: #e4e7eb;

.print-report {
  min-height: 100vh;
  background: $desk;
  color: $ink;
  font-family: 'Lexend', sans-serif;
  font-weight: 300;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;

  .muted {
    color: $muted;
  }

  // Toolbar
  .print-toolbar {
    position: sticky;
    top: 0;
    z-index: 2000;
    background: #1f2933;
    color: #fff;
    padding: 0.6rem 1rem 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

    &--inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1rem;
      max-width: 8.5in;
      margin: 0 auto;
    }
    &--back {
      color: #cbd2d9;
      white-space: nowrap;
      &:hover {
        color: #fff;
      }
    }
    &--status {
      flex: 1;
      font-size: 0.85rem;
      color: #f0b429;
      &.ready {
        color: #8eedc7;
      }
    }
    &--units {
      margin-bottom: 0 !important;
    }
    &--hint {
      max-width: 8.5in;
      margin: 0.35rem auto 0;
      font-size: 0.75rem;
      color: #9aa5b1;
    }
  }

  // Sheets look like paper on screen.
  .sheets {
    padding: 1.5rem 1rem 3rem;
  }
  .sheet {
    position: relative;
    width: 8.5in;
    margin: 0 auto 1.5rem;
    padding: 0.7in 0.5in;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 10px 30px rgba(0, 0, 0, 0.08);
    font-size: 10pt;
    line-height: 1.45;

    a {
      color: darken($accent, 10%);
    }

    &--message {
      min-height: 4in;
      h2 {
        font-size: 18pt;
        font-weight: 500;
        margin-bottom: 1rem;
      }
    }
  }

  .sheet--header {
    border-bottom: 2px solid $ink;
    padding-bottom: 0.4rem;
    margin-bottom: 1.1rem;

    h2 {
      font-size: 20pt;
      font-weight: 500;
      line-height: 1.15;
    }
  }
  .sheet--kicker {
    font-size: 7.5pt;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $accent;
  }

  .prose p {
    margin-bottom: 0.7em;
  }
  .callout {
    border-left: 3px solid $rule;
    padding-left: 0.75rem;
    color: $muted;
  }
  .lede {
    font-size: 10.5pt;
    margin-bottom: 1rem;
  }
  .footnote {
    font-size: 8pt;
    color: $muted;
    margin-top: 0.5rem;
  }

  // Cover
  .sheet--cover {
    display: flex;
    flex-direction: column;
    min-height: 11in;
  }
  .cover--band {
    margin: -0.7in -0.5in 0.6in;
    padding: 0.55in 0.5in 0.5in;
    background-color: $accent;
    background-image: url('~/assets/images/topo4.svg');
    background-size: cover;
    color: #fff;
  }
  .cover--brand {
    font-family: 'Lexend Peta', sans-serif;
    font-size: 17pt;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  .cover--brand-sub {
    font-size: 9pt;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.85;
    margin-top: 0.2rem;
  }
  .cover--eyebrow {
    font-size: 9pt;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $accent;
  }
  .cover--title {
    font-size: 28pt;
    font-weight: 500;
    line-height: 1.1;
    margin: 0.3rem 0 0.45in;
  }
  .cover--grid {
    display: grid;
    grid-template-columns: 3.6in 1fr;
    gap: 0.35in;
    align-items: start;
  }
  .cover--map {
    border: 1px solid $rule;
    #report--minimmap--map {
      width: 3.6in;
      height: 3.6in;
      min-width: 0;
      min-height: 0;
      margin: 0;
    }
  }
  .cover--facts {
    dt {
      font-size: 7.5pt;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: $muted;
    }
    dd {
      margin: 0 0 0.75rem;
      font-size: 11pt;
    }
  }
  .cover--link {
    word-break: break-all;
    font-size: 9pt !important;
  }
  .cover--footer {
    margin-top: auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.5in;
    border-top: 1px solid $rule;
    padding-top: 0.2in;
    font-size: 9pt;
    color: $muted;
  }
  .cover--logo {
    width: 2.1in;
    flex-shrink: 0;
  }

  // Summary
  .print-summary.qualitative-text {
    width: auto;
    margin: 0 0 1.25rem;
    padding: 0;
    font-size: 12pt;
    text-align: left;
    line-height: 1.45;

    // Line breaks are for the centered layout on the site.
    .generated br {
      display: none;
    }
    .generated p:last-child {
      margin-bottom: 0.75rem;
    }
    .about-blurb {
      margin: 0;
      font-size: 8pt;
      color: $muted;
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(1.6in, 1fr));
    gap: 0.15in;
    margin-bottom: 1.4rem;
  }
  .stat {
    border-top: 3px solid $accent;
    background: #f5f3ff;
    padding: 0.12in 0.14in;

    &--value {
      font-size: 19pt;
      font-weight: 500;
      line-height: 1.1;
    }
    &--label {
      font-size: 7.5pt;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-top: 0.25rem;
    }
    &--detail {
      font-size: 8.5pt;
      color: $muted;
    }
  }

  .glance h3,
  .unavailable h3,
  .contents--title {
    font-size: 12pt;
    font-weight: 500;
    margin: 0 0 0.5rem;
  }
  .glance--table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;

    th,
    td {
      padding: 0.22rem 0.45rem;
      border-bottom: 1px solid $rule;
      text-align: right;
      &.left {
        text-align: left;
      }
    }
    thead th {
      font-weight: 500;
      font-size: 8pt;
      color: $muted;
      vertical-align: bottom;
      border-bottom: 1.5px solid $ink;
    }
    td {
      font-family: 'IBM Plex Mono', monospace;
      white-space: nowrap;
    }
    tbody th[scope='row'] {
      font-weight: 400;
    }
    .glance--group-label th {
      padding-top: 0.45rem;
      font-weight: 500;
      border-bottom: 1px solid $ink;
    }
    .warmer {
      color: #ad1f00;
    }
    .cooler,
    .wetter {
      color: #1d4ed8;
    }
    .drier {
      color: #92400e;
    }
  }

  // About
  .sheet--continue .prose {
    font-size: 9.5pt;
  }
  .contents {
    margin: 0 0 1.25rem 1.2rem;
    font-size: 9.5pt;
    li {
      margin-bottom: 0.2rem;
    }
    &--name {
      font-weight: 500;
    }
    &--blurb {
      color: $muted;
      &::before {
        content: ' \2014  ';
      }
    }
  }
  .unavailable ul {
    margin-left: 1.2rem;
    list-style: disc;
    font-size: 9pt;
    li {
      margin-bottom: 0.25rem;
    }
  }

  // Back matter
  .sheet--back {
    display: flex;
    flex-direction: column;
  }
  .back--logo {
    width: 2.4in;
    margin-top: 0.4in;
  }

  // Reused report components, toned down for paper.
  .sheet--data {
    .title.is-3 {
      display: none; // replaced by the sheet header
    }
    .title.is-4 {
      font-size: 13pt;
      font-weight: 500;
      margin: 1.25rem 0 0.4rem !important;
    }
    .title.is-5 {
      font-size: 11pt;
      font-weight: 500;
    }
    .is-size-4,
    .is-size-5,
    .is-size-6 {
      font-size: 10pt !important;
    }
    .content p,
    .content li {
      margin-bottom: 0.6em;
    }
    .section {
      padding: 0;
    }
    .block:not(:last-child) {
      margin-bottom: 1rem;
    }
    .mt-6,
    .my-6 {
      margin-top: 1rem !important;
    }
    .mb-6,
    .my-6 {
      margin-bottom: 1rem !important;
    }
    .pt-6 {
      padding-top: 0 !important;
    }
    // CSV downloads & back-to-top links (and the paragraphs around them,
    // which would otherwise spill onto blank pages).
    .button,
    p:has(> .button:only-child) {
      display: none;
    }
    .modebar-container {
      display: none;
    }
    .minimaps-section-title {
      font-size: 11pt;
      font-weight: 500;
      padding: 0.75rem 0 0.4rem;
    }
    .map-title {
      min-height: 0 !important;
      font-size: 7.5pt;
      line-height: 1.25;
      margin-bottom: 0.15rem;
    }
    // Bulma's negative margins would poke past the page edge, which makes
    // Chrome shrink the whole document to fit.
    .columns {
      margin: 0;
    }

    // Charts are drawn at a fixed design width, then zoomed to fill the
    // 7.5in column, so they keep the proportions they have on the site.
    .wildfire-chart-wrapper,
    .chart {
      width: auto;
    }
    [id$='-chart'] {
      width: 1000px;
      margin: 0;
      zoom: 0.72;
    }
    #demographics-ages-chart {
      width: 1200px;
      zoom: 0.6;
    }
    #demographics-race-ethnicity-chart {
      zoom: 0.65;
      margin: 0 auto;
    }
    .minimap-container {
      margin-top: 0.25rem !important;
      margin-bottom: 0.25rem !important;
    }
    .field {
      margin-bottom: 0.4rem;
      font-size: 9pt;
      .label {
        font-size: 9pt;
        margin-bottom: 0.15rem;
      }
    }
    table.table {
      font-size: 8pt;
    }
    table.report-table {
      margin-top: 1rem;
      caption {
        font-size: 9.5pt;
        font-weight: 500;
      }
      th,
      td {
        padding: 0.25em 0.35em;
      }
    }
    // Compact legends.
    .swatch {
      width: 12px;
      height: 12px;
      margin-right: 6px;
    }
    table.table th,
    table.table td {
      padding: 0.2em 0.45em;
    }
    // Slightly smaller map grid, so each grid fits on a page with its legend.
    &#print-hydrology section.section > div > table {
      width: 78%;
      margin: 0 auto;
    }
    #demographics-map {
      width: 3.5in;
      height: 3.5in;
      min-width: 0;
      min-height: 0;
      margin: 0 auto;
    }
    .figure {
      margin: 0 0 0.75rem;
    }
  }
}

@media print {
  html,
  body {
    background: #fff !important;
  }
  .print-report {
    min-height: 0;
    background: none;

    .print-toolbar {
      display: none;
    }
    .sheets {
      padding: 0;
    }
    .sheet {
      width: auto;
      margin: 0;
      padding: 0;
      box-shadow: none;
      break-before: page;
      &:first-child {
        break-before: auto;
      }
    }
    // Letter height minus @page margins.
    .sheet--cover {
      min-height: 9.5in;
    }
    .cover--band {
      margin: 0 0 0.5in;
    }

    // Keep things whole across page boundaries.
    figure,
    .figure,
    [id$='-chart'],
    table,
    tr,
    .columns,
    .stat,
    .legend,
    .callout,
    h2,
    h3,
    h4,
    h5 {
      break-inside: avoid;
    }
    // Keep headings, selectors & intros with whatever follows them.
    h2,
    h3,
    h4,
    h5,
    .minimaps-section-title,
    .sheet--header,
    .field,
    .content:has(+ table),
    .content:has(+ [id$='-chart']),
    p:has(+ table) {
      break-after: avoid;
    }
    .legend {
      break-before: avoid;
    }
    // Chrome won't always honor the above, so also keep small groups
    // (a legend and its caption, a chart and its intro) in one piece.
    .content:has(> table),
    .block:has([id$='-chart']),
    .sheet--data section.section,
    .sheet--data section.section > div {
      break-inside: avoid;
    }
    .sheet.sheet--continue {
      break-before: auto;
      margin-top: 0.2in;
    }

    // Selectors print as a label showing only the chosen option.
    .sheet--data .field {
      display: flex;
      align-items: baseline;
      gap: 0.4em;
      .label::after {
        content: ':';
      }
      .b-radio {
        margin: 0;
        &:has(input:not(:checked)) {
          display: none;
        }
        .check {
          display: none;
        }
        .control-label {
          padding-left: 0;
          font-weight: 500;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
