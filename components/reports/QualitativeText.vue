<template>
  <div class="qualitative-text">
    <div class="generated" v-html="generateText()"></div>
    <p class="about-blurb">
      Late&ndash;century, high-emissions (RCP8.5), MRI or NCAR model (whichever
      shows greater change).<br />See tables below for more detailed
      information.
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
    font-size: 1rem;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'QualitativeText',
  props: ['reportData', 'permafrostData'],
  watch: {
    reportData: function () {
      this.generateText()
    },
    permafrostData: function () {
      this.generateText()
    },
  },
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
      hucName: 'getRawHucName',
      place: 'getPlaceName',
      units: 'units',
    }),
    unitsText() {
      if (this.units) {
        return this.units == 'metric' ? '&deg;C' : '&deg;F'
      }
    },
  },
  methods: {
    // Generate Qualitative Text
    // Input: None. (Uses reportData, place, and units properties)
    // Output: Text string containing HTML list items of processed seasonal metrics.
    generateText: function () {
      if (!this.reportData || !this.place) {
        return
      }
      return this.generateAnnualMetricsHtml()
    },
    collectSeasonalMetrics(season) {
      let historicalTemp = this.reportData['1950_2009'][season]['CRU-TS40']['CRU_historical']['tas']['mean']

      let historicalPrecip = this.reportData['1950_2009'][season]['CRU-TS40']['CRU_historical']['pr']['mean']

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
      this.reportData['2070_2099'][season]['MRI-CGCM3']['rcp85']['tas'],
      this.reportData['2070_2099'][season]['CCSM4']['rcp85']['tas'],
      )

      let precipMax = Math.max(
        this.reportData['2070_2099'][season]['MRI-CGCM3']['rcp85']['pr'],
        this.reportData['2070_2099'][season]['CCSM4']['rcp85']['pr'],
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
    permafrostChange() {
      let thicknesses = []
      let models = ['gfdlcm3', 'gisse2r', 'ipslcm5alr', 'mricgcm3', 'ncarccsm4']
      let scenarios = ['rcp45', 'rcp85']
      models.forEach(model => {
        scenarios.forEach(scenario => {
          thicknesses.push(this.permafrostData['gipl']['2095'][model][scenario]['alt'])
        })
      })
      let thicknessMax = _.max(thicknesses)
      let thicknessHistorical = this.permafrostData['gipl']['1995']['cruts31']['historical']['alt']
      return Math.round(thicknessMax / thicknessHistorical * 100 - 100)
    },
    // Subfunction: Generate annual metrics HTML string
    // Input: None. (Uses constant seasons)
    // Output: A string containing HTML for a linked list of all
    //         annual metrics of importance.
    generateAnnualMetricsHtml: function () {
      var annualTemperatureAverage = 0
      var annualHighestTempChange = 0
      var seasonWithHighestTempChange = 'None'
      var annualHighestPrecipPercentChange = 0
      var seasonWithHighestPrecipChange = 'None'
      var aboveFreezingSeasons = []

      this.seasons.forEach((season) => {
        let seasonOutput = this.collectSeasonalMetrics(season)

        // Collect highest seasonal temperature averages to compute annual average later.
        annualTemperatureAverage =
          annualTemperatureAverage + seasonOutput['maxTempDiff']

        // Check if this temperature difference is the highest out of all the seasons thus far.
        if (annualHighestTempChange < seasonOutput['maxTempDiff']) {
          annualHighestTempChange = seasonOutput['maxTempDiff']
          seasonWithHighestTempChange = seasonOutput['season']
        }

        // Check if this prepitation change is the highest out of all the seasons thus far.
        if (
          annualHighestPrecipPercentChange < seasonOutput['precipPercentChange']
        ) {
          annualHighestPrecipPercentChange = seasonOutput['precipPercentChange']
          seasonWithHighestPrecipChange = seasonOutput['season']
        }

        // If a season was marked as being above freezing when historically below freezing,
        // push it onto an array of seasons.
        if (seasonOutput['aboveFreezing'] == true) {
          aboveFreezingSeasons.push(seasonOutput['season'])
        }
      })

      // Average value against the 4 seasons included.
      annualTemperatureAverage = Math.round(annualTemperatureAverage / 4)

      var returnedString = ''

      // TODO.  If we do these kinds of comparisons a lot, we probably want
      // to move this logic to the store or another component in some way.
      // This code does need some special grammar, though, which wouldn't
      // generalize!
      if (this.$route.path.includes('community')) {
        returnedString += '<p>In <strong>' + this.place + '</strong>'
      } else if (this.$route.path.includes('huc')) {
        returnedString += '<p>In the <strong>' + this.hucName + '</strong>'
      } else {
        returnedString += '<p>At <strong>' + this.place + '</strong>'
      }

      // Create the returned string using the values from the loop above.
      returnedString +=
        ',<br/>average annual temperatures<br/>may increase by about <strong>' +
        annualTemperatureAverage +
        this.unitsText +
        '</strong> by the end of the century.</p>'

      returnedString +=
        '<p><strong>' +
        seasonWithHighestTempChange +
        '</strong> temperatures are increasing the most (<strong>+' +
        annualHighestTempChange +
        this.unitsText +
        '</strong>).</p>'

      // If any season is marked as above freezing in the future when historically below freezing,
      // expand those values out to be added as an additional list item.
      if (aboveFreezingSeasons.length > 0) {
        returnedString += '<p>'
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
        returnedString +=
          transitioningSeasons +
          ' may transition from below freezing to <strong>above freezing</strong> in the future.</p>'
      }
      returnedString +=
        '<p>Models have higher uncertainty with regard to precipitation,<br/> but <strong>' +
        seasonWithHighestPrecipChange.toLowerCase() +
        '</strong> is likely to have more precipitation (<strong>+' +
        annualHighestPrecipPercentChange +
        '%</strong>).</p>'

      let permafrostChange = this.permafrostChange()
      if (permafrostChange > 0) {
        returnedString += '<p>By the late century, the active layer permafrost thickness may '
        if (permafrostChange < 100) {
          returnedString += 'decrease by <strong>' + permafrostChange + '%</strong>.</p>'
        } else {
          returnedString += 'disappear.</p>'
        }
      }

      return returnedString
    },
  },
}
</script>
