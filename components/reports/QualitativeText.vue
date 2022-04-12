<template>
  <div class="qualitative-text" v-if="qualitativeText">
    <div class="generated" v-html="qualitativeText"></div>
    <p class="about-blurb">
      Late&ndash;century, high-emissions (RCP 8.5), MRI CGCM3 or NCAR CCSM4
      model (whichever shows greater change).<br />See tables and sections below
      for more detailed information and definitions of fire activity levels.
    </p>
  </div>
</template>
<style lang="scss" scoped>
.qualitative-text {
  width: 55vw;
  font-size: 1.55rem;
  margin: 2.5rem auto -1rem;
  padding: 1rem 0;
  text-align: center;
  line-height: 1.35;
  font-weight: 350;

  // Because it's v-html injected, need to use /deep/.
  ::v-deep * {
    p:not(:last-child) {
      margin-bottom: 1.5rem;
    }
    p:last-child {
      margin-bottom: 2rem;
    }
  }

  .about-blurb {
    margin: 1rem;
    border-top: 1px solid #efeced;
    padding-top: 0.5rem;
    font-weight: 400;
    font-size: 0.9rem;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'QualitativeText',
  data: function () {
    return {
      seasons: ['MAM', 'JJA', 'SON', 'DJF'],
      seasonNames: {
        DJF: 'Winter',
        MAM: 'Spring',
        JJA: 'Summer',
        SON: 'Fall',
      },
    }
  },
  computed: {
    ...mapGetters({
      placeType: 'place/type',
      hucName: 'place/rawHucName',
      place: 'place/name',
      units: 'units',
      climateData: 'climate/climateData',
      altThawData: 'permafrost/altThaw',
      showPermafrost: 'permafrost/valid',
      permafrostPresent: 'permafrost/present',
      permafrostDisappears: 'permafrost/disappears',
      flammabilityData: 'wildfire/flammability',
      vegChangeData: 'wildfire/veg_change',
      showWildfires: 'wildfire/valid',
    }),
    unitsText() {
      if (this.units) {
        return this.units == 'metric' ? '&deg;C' : '&deg;F'
      }
    },
    depthFragment() {
      return this.units == 'imperial' ? '9.8ft' : '3m'
    },
    qualitativeText() {
      return this.generateText()
    },
  },
  watch: {
    climateData: function () {
      this.generateText()
    },
    altThawData: function () {
      this.generateText()
    },
    flammabilityData: function () {
      this.generateText()
    },
    vegChangeData: function () {
      this.generateText()
    },
  },
  methods: {
    // Generate Qualitative Text
    // Input: None. (Uses climateData, place, and units properties)
    // Output: Text string containing HTML list items of processed seasonal metrics.
    generateText: function () {
      // Guard if data not present yet.
      if (!this.place) {
        return
      }

      return this.generateAnnualMetricsHtml()
    },
    collectSeasonalMetrics(season) {
      let historicalTemp = this.climateData['1950_2009'][season]['CRU-TS40'][
        'CRU_historical'
      ]['tas']['mean']

      let historicalPrecip = this.climateData['1950_2009'][season]['CRU-TS40'][
        'CRU_historical'
      ]['pr']['mean']

      var seasonMetrics = {
        season: this.seasonNames[season],
        maxTempDiff: 0,
        maxPrecipDiff: 0,
        precipPercentChange: 0,
        aboveFreezing: false,
      }

      // For RCP8.5 only / late-century, pick the model with the greater change
      // and use that value.

      // Take an average of both temperature and precipitation for the same season and RCP from both models.
      let tempMax = Math.max(
        this.climateData['2070_2099'][season]['MRI-CGCM3']['rcp85']['tas'],
        this.climateData['2070_2099'][season]['CCSM4']['rcp85']['tas']
      )

      let precipMax = Math.max(
        this.climateData['2070_2099'][season]['MRI-CGCM3']['rcp85']['pr'],
        this.climateData['2070_2099'][season]['CCSM4']['rcp85']['pr']
      )

      // If the maximum temperature difference is less than the current temperature difference,
      // set the new value as the greatest seasonal temperature difference.
      if (seasonMetrics['maxTempDiff'] < tempMax - historicalTemp) {
        seasonMetrics['maxTempDiff'] = Math.round(tempMax - historicalTemp)
      }

      // If the maximum precipitation difference is less than the current precipitation difference,
      // set the new value as the greatest seasonal precipitation difference and compute new
      // percentage changed stored as a rounded integer.
      if (seasonMetrics['maxPrecipDiff'] < precipMax - historicalPrecip) {
        seasonMetrics['maxPrecipDiff'] = precipMax - historicalPrecip
        seasonMetrics['precipPercentChange'] = Math.round(
          (precipMax / historicalPrecip) * 100 - 100
        )
      }

      // We set this season to above freezing if one of the modeled averages is above freezing
      // while the historical value for temperature is below freezing.
      if (
        (this.units == 'metric' && historicalTemp < 0 && tempMax > 0) ||
        (this.units == 'imperial' && historicalTemp < 32 && tempMax >= 32)
      ) {
        seasonMetrics['aboveFreezing'] = true
      }

      return seasonMetrics
    },
    temperatureString() {
      var annualTemperatureAverage = 0
      var annualHighestTempChange = 0
      var seasonWithHighestTempChange = 'None'
      var aboveFreezingSeasons = []

      this.seasons.forEach(season => {
        let seasonOutput = this.collectSeasonalMetrics(season)

        // Collect highest seasonal temperature averages to compute annual average later.
        annualTemperatureAverage =
          annualTemperatureAverage + seasonOutput['maxTempDiff']

        // Check if this temperature difference is the highest out of all the seasons thus far.
        if (annualHighestTempChange < seasonOutput['maxTempDiff']) {
          annualHighestTempChange = seasonOutput['maxTempDiff']
          seasonWithHighestTempChange = seasonOutput['season']
        }

        // If a season was marked as being above freezing when historically below freezing,
        // push it onto an array of seasons.
        if (seasonOutput['aboveFreezing'] == true) {
          aboveFreezingSeasons.push(seasonOutput['season'])
        }
      })

      // Average value against the 4 seasons included.
      annualTemperatureAverage = Math.round(annualTemperatureAverage / 4)

      // Create the returned string using the values from the loop above.
      let string =
        '<p>Average annual temperatures<br/>may increase by about <strong>' +
        annualTemperatureAverage +
        this.unitsText +
        '</strong> by the end of the century.</p>'

      string +=
        '<p><strong>' +
        seasonWithHighestTempChange +
        '</strong> temperatures are increasing the most (<strong>+' +
        annualHighestTempChange +
        this.unitsText +
        '</strong>).</p>'

      // If any season is marked as above freezing in the future when historically below freezing,
      // expand those values out to be added as an additional list item.
      if (aboveFreezingSeasons.length > 0) {
        string += '<p>'
        let transitioningSeasons = ''

        switch (aboveFreezingSeasons.length) {
          case 1:
            transitioningSeasons =
              '<strong>' + aboveFreezingSeasons[0] + '</strong>'
            break
          case 2:
            transitioningSeasons =
              '<strong>' +
              aboveFreezingSeasons[0] +
              '</strong> and <strong>' +
              aboveFreezingSeasons[1].toLowerCase() +
              '</strong>'
            break
          case 3:
            transitioningSeasons =
              '<strong>' +
              aboveFreezingSeasons[0] +
              '</strong>, <strong>' +
              aboveFreezingSeasons[1].toLowerCase() +
              '</strong> and <strong>' +
              aboveFreezingSeasons[2].toLowerCase() +
              '</strong>'
            break
        }
        string +=
          transitioningSeasons +
          ' may transition from below freezing<br/>to <strong>above freezing</strong> in the future.</p>'
      }

      return string
    },
    precipitationString() {
      var annualHighestPrecipPercentChange = 0
      var seasonWithHighestPrecipChange = 'None'

      this.seasons.forEach(season => {
        let seasonOutput = this.collectSeasonalMetrics(season)
        // Check if this prepitation change is the highest out of all the seasons thus far.
        if (
          annualHighestPrecipPercentChange < seasonOutput['precipPercentChange']
        ) {
          annualHighestPrecipPercentChange = seasonOutput['precipPercentChange']
          seasonWithHighestPrecipChange = seasonOutput['season']
        }
      })

      return (
        '<p>Models have higher uncertainty with regard to precipitation,<br/> ' +
        'but <strong>' +
        seasonWithHighestPrecipChange.toLowerCase() +
        '</strong> is likely to have more precipitation (<strong>+' +
        annualHighestPrecipPercentChange +
        '%</strong>).</p>'
      )
    },
    permafrostString() {
      let years = Object.keys(this.altThawData)
      let historicalYear = years.slice(0, 1)
      let lastYear = years.slice(-1)[0]
      let thicknessHistorical = this.altThawData[historicalYear]

      if (thicknessHistorical == null) {
        return 0
      }

      let thicknesses = []
      let models = ['mricgcm3', 'ncarccsm4']
      let scenarios = ['rcp85']

      models.forEach(model => {
        scenarios.forEach(scenario => {
          let value = this.altThawData[lastYear][model][scenario]
          thicknesses.push(value)
        })
      })
      let thicknessMax = _.max(thicknesses)

      let permafrostChange = Math.round(
        (thicknessMax / thicknessHistorical) * 100 - 100
      )

      let string = ''
      if (this.permafrostPresent && this.permafrostDisappears) {
        string =
          '<p>By the late century, permafrost within ' +
          this.depthFragment +
          ' of the ground surface may <strong>disappear</strong>.</p>'
      } else if (permafrostChange > 0) {
        string =
          '<p>By the late century, active layer permafrost thickness<br/> may increase by <strong>' +
          Math.abs(permafrostChange) +
          '%</strong>.</p>'
      }

      return string
    },
    wildfireString() {
      var categoryFromRf = function (rf) {
        // Remove this if the data sculpting to convert
        // raw ALF into %s is removed elsewhere.
        rf = rf / 100

        if (rf < 0.002) return 'very low'
        if (rf >= 0.002 && rf < 0.005) return 'low'
        if (rf >= 0.005 && rf < 0.01) return 'moderate'
        if (rf >= 0.01 && rf < 0.02) return 'high'
        if (rf >= 0.02) return 'very high'
      }

      var isModerateOrMore = function (rf) {
        // Remove this if the data sculpting to convert
        // raw ALF into %s is removed elsewhere.
        rf = rf / 100
        return rf >= 0.005
      }

      let historicalRf = this.flammabilityData['1950-1979']['MODEL-SPINUP'][
        'historical'
      ]['rf']
      let midHighestPredictedRf = Math.max(
        this.flammabilityData['2040-2069']['MRI-CGCM3']['rcp45']['rf'],
        this.flammabilityData['2040-2069']['MRI-CGCM3']['rcp60']['rf'],
        this.flammabilityData['2040-2069']['MRI-CGCM3']['rcp85']['rf'],
        this.flammabilityData['2040-2069']['NCAR-CCSM4']['rcp45']['rf'],
        this.flammabilityData['2040-2069']['NCAR-CCSM4']['rcp60']['rf'],
        this.flammabilityData['2040-2069']['NCAR-CCSM4']['rcp85']['rf']
      )
      let lateHighestPredictedRf = Math.max(
        this.flammabilityData['2070-2099']['MRI-CGCM3']['rcp45']['rf'],
        this.flammabilityData['2070-2099']['MRI-CGCM3']['rcp60']['rf'],
        this.flammabilityData['2070-2099']['MRI-CGCM3']['rcp85']['rf'],
        this.flammabilityData['2070-2099']['NCAR-CCSM4']['rcp45']['rf'],
        this.flammabilityData['2070-2099']['NCAR-CCSM4']['rcp60']['rf'],
        this.flammabilityData['2070-2099']['NCAR-CCSM4']['rcp85']['rf']
      )
      let midDiff = parseInt(
        (Math.abs(midHighestPredictedRf - historicalRf) / historicalRf) * 100
      )
      let midSign =
        midHighestPredictedRf - historicalRf > 0 ? '&plus;' : '&minus;'
      let midChange =
        midHighestPredictedRf - historicalRf > 0 ? 'increase' : 'decrease'

      let lateDiff = parseInt(
        (Math.abs(lateHighestPredictedRf - historicalRf) / historicalRf) * 100
      )
      let lateSign =
        lateHighestPredictedRf - historicalRf > 0 ? '&plus;' : '&minus;'
      let lateChange =
        lateHighestPredictedRf - historicalRf > 0 ? 'increase' : 'decrease'

      let historicalCategory = categoryFromRf(historicalRf)
      let midCategory = categoryFromRf(midHighestPredictedRf)
      let lateCategory = categoryFromRf(lateHighestPredictedRf)

      let quip = _.template(
        'In the past, this area had <strong><%= category %></strong> flammability.  '
      )({
        category: historicalCategory,
      })

      // Special case: fire activity is about the same throughout.
      if (
        historicalCategory == midCategory &&
        historicalCategory == lateCategory
      ) {
        quip += 'Future flammability may be <strong>about the same</strong>'
        if (isModerateOrMore(historicalRf)) {
          quip += _.template(' (<%= sign %><%= diff %>&#37; by late century).')(
            {
              sign: lateSign,
              diff: lateDiff,
            }
          )
        } else {
          quip += '.'
        }
      } else {
        // Mid-century fragment.
        // If it's the same as historical...
        if (historicalCategory == midCategory) {
          quip += _.template(
            'By the mid&ndash;century this may remain <%= category %>'
          )({ category: midCategory })
          if (isModerateOrMore(historicalRf)) {
            quip += _.template(' (<%= sign %><%= diff %>&#37;).  ')({
              sign: midSign,
              diff: midDiff,
            })
          } else {
            quip += '.  '
          }
        } else {
          quip += _.template(
            'By the mid&ndash;century, <strong>flammability may <%= change %> to <%= category %></strong>'
          )({
            category: midCategory,
            change: midChange,
          })
          if (isModerateOrMore(historicalRf)) {
            quip += _.template(' (<%= sign %><%= diff %>&#37;).  ')({
              sign: midSign,
              diff: midDiff,
            })
          } else {
            quip += '.  '
          }
        }

        // Late-century fragment.
        if (historicalCategory == lateCategory) {
          quip += _.template(
            'By the late&ndash;century this may remain <%= category %>'
          )({ category: lateCategory })
          if (isModerateOrMore(historicalRf)) {
            quip += _.template(' (<%= sign %><%= diff %>&#37;)')({
              sign: lateSign,
              diff: lateDiff,
            })
          }
          quip += ' compared with historical flammability.'
        } else {
          quip += _.template(
            'By the late&ndash;century, <strong>flammability may <%= change %> to <%= category %></strong>'
          )({
            category: lateCategory,
            change: lateChange,
          })
          if (isModerateOrMore(historicalRf)) {
            quip += _.template(' (<%= sign %><%= diff %>&#37;)')({
              sign: lateSign,
              diff: lateDiff,
            })
          }
          quip += ' compared with historical flammability.'
        }
      }

      return quip
    },
    // Subfunction: Generate annual metrics HTML string
    // Input: None. (Uses constant seasons)
    // Output: A string containing HTML for a linked list of all
    //         annual metrics of importance.
    generateAnnualMetricsHtml: function () {
      let prefix
      switch (this.placeType) {
        case 'community':
          prefix = '<p>In <strong>' + this.place + '</strong>'
          break
        case 'huc':
          prefix = '<p>In the <strong>' + this.hucName + '</strong>'
          break
        default:
          prefix = '<p>At <strong>' + this.place + '</strong>'
          break
      }

      let text = ''
      if (this.climateData) {
        text += this.temperatureString()
        text += this.precipitationString()
      }

      if (this.showPermafrost) {
        text += this.permafrostString()
      }

      if (this.showWildfires) {
        text += this.wildfireString()
      }

      if (text == '') {
        return text
      }

      // Make first qualitative text line a continuation of the sentence
      // "At <location>, ..."
      if (text.length > 0) {
        text = text.replace('<p>', '')
        let firstLetter = text.charAt(0)
        text = text.replace(firstLetter, firstLetter.toLowerCase())
        text = ',<br />' + text
      }

      let returnedString = prefix + text
      return returnedString
    },
  },
}
</script>
