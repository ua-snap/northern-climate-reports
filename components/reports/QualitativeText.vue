<template>
  <div class="qualitative-text content" v-if="qualitativeText">
    <div class="generated" v-html="qualitativeText"></div>
    <p class="about-blurb">
      Summary across all models and scenarios.  See tables and sections below
      for more detailed information and definitions.
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
import { convertToInches, convertDiffValueToFahrenheit } from '~/utils/convert'

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
      rawClimateData: 'climate/rawClimateData',
      climateData: 'climate/climateData',
      permafrostData: 'permafrost/permafrostData',
      showPermafrost: 'permafrost/valid',
      flammabilityData: 'wildfire/flammability',
      flamThresholds: 'wildfire/flammabilityThresholds',
      vegChangeData: 'wildfire/veg_change',
      vegTypes: 'wildfire/vegTypes',
      showWildfires: 'wildfire/valid',
      beetleData: 'beetle/beetleData',
      showBeetles: 'beetle/valid',
    }),
    tempUnitsText() {
      if (this.units) {
        return this.units == 'metric' ? '&deg;C' : '&deg;F'
      }
    },
    depthUnitsText() {
      return this.units == 'metric' ? 'meters' : 'inches'
    },
    qualitativeText() {
      return this.generateText()
    },
  },
  watch: {
    climateData: function () {
      this.generateText()
    },
    permafrostData: function () {
      this.generateText()
    },
    flammabilityData: function () {
      this.generateText()
    },
    vegChangeData: function () {
      this.generateText()
    },
    beetleData: function () {
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
      // We need to use the raw (not unit-converted) values here
      // to avoid rounding issues yielding different %s.
      // https://github.com/ua-snap/iem-webapp/issues/132

      let historicalTemp = this.rawClimateData['1950_2009'][season]['CRU-TS40'][
        'CRU_historical'
      ]['tas']['mean']

      let historicalPrecip = this.rawClimateData['1950_2009'][season][
        'CRU-TS40'
      ]['CRU_historical']['pr']['mean']

      var seasonMetrics = {
        season: this.seasonNames[season],
        maxTempDiff: 0,
        precipPercentChange: 0,
        aboveFreezing: false,
      }

      // For RCP8.5 only / late-century, pick the model with the greater change
      // and use that value.

      // Take an average of both temperature and precipitation for the same season and RCP from both models.
      let tempMax = Math.max(
        this.rawClimateData['2070_2099'][season]['MRI-CGCM3']['rcp85']['tas'],
        this.rawClimateData['2070_2099'][season]['CCSM4']['rcp85']['tas']
      )

      let precipMax = Math.max(
        this.rawClimateData['2070_2099'][season]['MRI-CGCM3']['rcp85']['pr'],
        this.rawClimateData['2070_2099'][season]['CCSM4']['rcp85']['pr']
      )

      seasonMetrics['maxTempDiff'] = tempMax - historicalTemp

      // Set the new value as the greatest seasonal precipitation
      // difference and compute a new percentage changed stored
      // as a rounded integer.
      seasonMetrics['precipPercentChange'] = Math.round(
        (precipMax / historicalPrecip) * 100 - 100
      )

      // We set this season to above freezing if one of the modeled averages is above freezing
      // while the historical value for temperature is below freezing.
      if (historicalTemp < 0 && tempMax > 0) {
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
          annualHighestTempChange = parseFloat(
            seasonOutput['maxTempDiff']
          ).toFixed(0)
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

      if (this.units == 'imperial') {
        annualTemperatureAverage = convertDiffValueToFahrenheit(
          annualTemperatureAverage
        )
        annualHighestTempChange = convertDiffValueToFahrenheit(
          annualHighestTempChange
        )
      }

      // Create the returned string using the values from the loop above.
      let string =
        '<p>Average annual temperatures<br/>may increase by about <strong>' +
        annualTemperatureAverage +
        this.tempUnitsText +
        '</strong> by the end of the century.</p>'

      string +=
        '<p><strong>' +
        seasonWithHighestTempChange +
        '</strong> temperatures are increasing the most (<strong>+' +
        annualHighestTempChange +
        this.tempUnitsText +
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
      let models = ['GFDL-CM3', 'NCAR-CCSM4']
      let differences = []

      models.forEach(model => {
        let firstEraTop = this.permafrostData['2021-2039'][model]['rcp85'][
          'gipl1kmmean'
        ]['permafrosttop']
        let lastEraTop = this.permafrostData['2070-2099'][model]['rcp85'][
          'gipl1kmmean'
        ]['permafrosttop']
        let difference = lastEraTop - firstEraTop
        differences.push(difference)
      })

      let maxDifference = _.max(differences)

      if (maxDifference > 0) {
        // Inclusively, there are 79 years between 2021 and 2099.
        let degradationRate = maxDifference / 79

        let precision = this.units == 'metric' ? 2 : 1
        degradationRate = degradationRate.toFixed(precision)

        return (
          '<p>Models indicate that permafrost degradation may occur at a rate of <strong>' +
          degradationRate +
          ' ' +
          this.depthUnitsText +
          ' per year</strong>.</p>'
        )
      } else {
        return ''
      }
    },
    wildfireString() {
      var categoryFromFlam = flam => {
        let label
        this.flamThresholds.forEach(threshold => {
          if (flam >= threshold['min'] && flam < threshold['max']) {
            label = threshold['label'].toLowerCase()
          }
        })
        return label
      }

      var isModerateOrMore = flam => {
        let results = this.flamThresholds.filter(x => x['label'] == 'Moderate')
        let moderate = _.first(results)
        return flam >= moderate['min']
      }

      let historicalFlam = this.flammabilityData['1980-2008']['MODEL-SPINUP'][
        'historical'
      ]
      let midHighestPredictedFlam = Math.max(
        this.flammabilityData['2040-2069']['MRI-CGCM3']['rcp45'],
        this.flammabilityData['2040-2069']['MRI-CGCM3']['rcp60'],
        this.flammabilityData['2040-2069']['MRI-CGCM3']['rcp85'],
        this.flammabilityData['2040-2069']['NCAR-CCSM4']['rcp45'],
        this.flammabilityData['2040-2069']['NCAR-CCSM4']['rcp60'],
        this.flammabilityData['2040-2069']['NCAR-CCSM4']['rcp85']
      )
      let lateHighestPredictedFlam = Math.max(
        this.flammabilityData['2070-2099']['MRI-CGCM3']['rcp45'],
        this.flammabilityData['2070-2099']['MRI-CGCM3']['rcp60'],
        this.flammabilityData['2070-2099']['MRI-CGCM3']['rcp85'],
        this.flammabilityData['2070-2099']['NCAR-CCSM4']['rcp45'],
        this.flammabilityData['2070-2099']['NCAR-CCSM4']['rcp60'],
        this.flammabilityData['2070-2099']['NCAR-CCSM4']['rcp85']
      )

      let midDiff = parseInt(
        (Math.abs(midHighestPredictedFlam - historicalFlam) / historicalFlam) *
          100
      )
      let midSign =
        midHighestPredictedFlam - historicalFlam > 0 ? '&plus;' : '&minus;'
      let midChange =
        midHighestPredictedFlam - historicalFlam > 0 ? 'increase' : 'decrease'

      let lateDiff = parseInt(
        (Math.abs(lateHighestPredictedFlam - historicalFlam) / historicalFlam) *
          100
      )
      let lateSign =
        lateHighestPredictedFlam - historicalFlam > 0 ? '&plus;' : '&minus;'
      let lateChange =
        lateHighestPredictedFlam - historicalFlam > 0 ? 'increase' : 'decrease'

      let historicalCategory = categoryFromFlam(historicalFlam)
      let midCategory = categoryFromFlam(midHighestPredictedFlam)
      let lateCategory = categoryFromFlam(lateHighestPredictedFlam)

      let quip = _.template(
        '<p>In the past, this area had <strong><%= category %></strong> flammability.  '
      )({
        category: historicalCategory,
      })

      // Special case: fire activity is about the same throughout.
      if (
        historicalCategory == midCategory &&
        historicalCategory == lateCategory
      ) {
        quip += 'Future flammability may be <strong>about the same</strong>'
        if (isModerateOrMore(historicalFlam)) {
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
          if (isModerateOrMore(historicalFlam)) {
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
          if (isModerateOrMore(historicalFlam)) {
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
          if (isModerateOrMore(historicalFlam)) {
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
          if (isModerateOrMore(historicalFlam)) {
            quip += _.template(' (<%= sign %><%= diff %>&#37;)')({
              sign: lateSign,
              diff: lateDiff,
            })
          }
          quip += ' compared with historical flammability.'
        }
      }
      quip += '</p>'

      return quip
    },
    vegChangeString() {
      // These variables will contain the historical vegetation
      // type with the highest percentage at this point or area
      let historical_veg_percentage = 0.0
      let historical_veg_type = null

      // Iterate through all of the vegetation types
      Object.keys(this.vegTypes).forEach(type => {
        if (type == 'not_modeled') {
          return
        }

        // If the vegetation percentage is greater than the
        // current maximum vegetation percentage, make this
        // percentage the new maximum and record the
        // vegetation type.
        if (
          this.vegChangeData['1950-2008']['MODEL-SPINUP']['historical'][type] >
          historical_veg_percentage
        ) {
          historical_veg_percentage = this.vegChangeData['1950-2008'][
            'MODEL-SPINUP'
          ]['historical'][type]
          historical_veg_type = type
        }
      })

      // This variable will hold the minimum vegetation percentage
      // of the historical vegetation type in the era
      // 2070-2099 across all of the models and RCPs.
      let future_veg_percentage = 100.0

      let models = [
        'GFDL-CM3',
        'GISS-E2-R',
        'IPSL-CM5A-LR',
        'MRI-CGCM3',
        'NCAR-CCSM4',
      ]
      let rcps = ['rcp45', 'rcp60', 'rcp85']

      // For each model and each RCP, check to see if the current
      // iteration is smaller than the current minimum percentage.
      models.forEach(model => {
        rcps.forEach(rcp => {
          if (
            this.vegChangeData['2070-2099'][model][rcp][historical_veg_type] <
            future_veg_percentage
          ) {
            future_veg_percentage = this.vegChangeData['2070-2099'][model][rcp][
              historical_veg_type
            ]
          }
        })
      })

      // Take the absolute value of the percentage change to find the
      // percentage difference between historical and future vegetation.
      let percent_diff = Math.abs(
        1 - future_veg_percentage / historical_veg_percentage
      )

      // If the percentage difference is less than 5%, don't show this section.
      if (percent_diff < 0.05) {
        return ''
      } else {
        let quip =
          '<p>Based on climate and fire-driven shifts, vegetation in this area may be '

        // If the percentage difference is between 5-20%,
        // the vegetation has slighly changed. If the
        // percentage difference is higher than 20%,
        // the vegation has notably change.
        if (percent_diff >= 0.05 && percent_diff <= 0.2) {
          quip += '<strong>slightly different</strong>'
        } else {
          quip += '<strong>notably different</strong>'
        }
        quip += ' by the end of the century.</p>'
        return quip
      }
    },
    beetleString() {
      // This JSON object contains the level associated with each
      // returned climate protection level along with text to provide
      // for the historical text based on that level of protection.
      const protection = {
        high: { level: 1, text: 'highly protective' },
        minimal: { level: 2, text: 'minimally protective' },
        none: { level: 3, text: 'not protective' },
      }
      const historicalProtection = this.beetleData['1988-2017']['Daymet'][
        'Historical'
      ]['medium']['climate-protection']

      const models = ['GFDL-ESM2M', 'HadGEM2-ES', 'MRI-CGCM3', 'NCAR-CCSM4']
      const rcps = ['rcp45', 'rcp85']

      let midCenturyProtection = 'high'
      let lateCenturyProtection = 'high'

      // This loop finds the worst climate protection in the medium snowpack
      // across all models and rcps for both the mid-century and late-century
      // time periods.
      for (const model of models) {
        // If the protection level is 'none' (maximum lack of climate protection)
        // for both mid and late century, break out of the loop
        if (midCenturyProtection == 'none' && lateCenturyProtection == 'none')
          break
        for (const rcp of rcps) {
          let currentMidProtection = this.beetleData['2040-2069'][model][rcp][
            'medium'
          ]['climate-protection']
          let currentLateProtection = this.beetleData['2070-2099'][model][rcp][
            'medium'
          ]['climate-protection']

          if (
            protection[currentMidProtection].level >
            protection[midCenturyProtection].level
          ) {
            midCenturyProtection = currentMidProtection
          }

          if (
            protection[currentLateProtection].level >
            protection[lateCenturyProtection].level
          ) {
            lateCenturyProtection = currentLateProtection
          }
        }
      }

      // Same is a boolean used to determine the language used to
      // describe future scenarios against the historical value.
      let same = false

      // Quip contains the qualitative text to be returned for this location
      let quip =
        '<p>Historically, climate conditions were <strong>' +
        protection[historicalProtection].text +
        '</strong> against spruce beetle outbreaks. Under normal snow conditions, climate conditions in the future may provide <strong>'
      if (
        protection[midCenturyProtection].level >
        protection[historicalProtection].level
      ) {
        quip += 'less '
      } else if (
        protection[midCenturyProtection].level ==
        protection[historicalProtection].level
      ) {
        quip += 'about the same '
        same = true
      } else {
        quip += 'more '
      }
      quip += 'protection</strong> by mid-century'
      if (
        protection[lateCenturyProtection].level >
        protection[midCenturyProtection].level
      ) {
        if (same) {
          quip +=
            ' and <strong>less protection</strong> by late this century.</p>'
        } else {
          quip +=
            ' and even <strong>less protection</strong> by late this century.</p>'
        }
      } else if (
        protection[lateCenturyProtection].level ==
        protection[midCenturyProtection].level
      ) {
        if (same) {
          // This is instead of saying "about the same by mid-century
          // and about the same by late this century."
          quip += ' and continuing into late this century.</p>'
        } else {
          quip +=
            ' and <strong>about the same protection</strong> by late this century.</p>'
        }
      } else {
        quip += '.</p>'
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
        case 'protected_area':
        case 'climate_division':
        case 'fire_zone':
        case 'borough':
        case 'census_area':
          prefix = '<p>In the <strong>' + this.place + '</strong>'
          break
        case 'corporation':
        case 'ethnolinguistic_region':
        case 'first_nation':
        case 'game_management_unit':
          prefix = '<p>In <strong>' + this.place + '</strong>'
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
        text += this.vegChangeString()
      }

      if (this.showBeetles) {
        text += this.beetleString()
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
