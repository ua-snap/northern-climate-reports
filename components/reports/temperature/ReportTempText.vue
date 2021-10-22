<template>
	<div class="temp-text-wrapper">
		<div id="temp-text" />
	</div>
</template>
<style lang="scss" scoped>
.temp-text-wrapper {
	padding-bottom: 6rem;
}
</style>
<script>
  import _ from 'lodash'
  export default {
    name: 'ReportTempText',
    props: ['reportData', 'place', 'units'],
    mounted() {
      this.generateText()
    },
    watch: {
      reportData: function () {
        this.generateText()
      },
    },
    methods: {
      generateText: function () {
        let reportData = this.reportData

        if (!reportData) {
          return
        }

        // What is the name of the place we are (lat, lon)
          // --> In variable 'place'
        let place = this.place

        let seasons = ['DJF', 'MAM', 'JJA', 'SON']
        let season_names = {'DJF': 'Winter', 'MAM': 'Spring', 'JJA': 'Summer', 'SON': 'Fall'}
        let periods = ['2040_2070', '2070_2100']
        let period_names = {'2040_2070': '2040-2070', '2070_2100': '2070-2100'}
        let models = ['MRI-CGCM3', 'CCSM4']
        
        let unit_type = this.units
        let units = this.units == 'metric' ? 'ºC' : 'ºF'
        function collect_seasonal_metrics(season) {

          var season_metrics = {'season': season_names[season], 'max_temp_diff': 0, 'max_temp_period': 'None', 'temp_rising': false, 'above_freezing': false}
          let historical_temp = reportData['1910-2009'][season]['CRU-TS31']['CRU_historical']['tas']

          periods.forEach((period) => {
            models.forEach((model) => {

                // TODO: Do we only want to compare against RCP 8.5? RCP 4.5 is pretty unrealistic at this point.
                let current_temp = reportData[period][season][model]['rcp85']['tas']
                
                // TODO: What if one model says the temperature is rising and the other doesn't?
                // Are the temperatures increasing?
                if (historical_temp < current_temp) {
                  season_metrics['temp_rising'] = true
                }

                // By the most in what period?
                if (Math.abs(season_metrics['max_temp_diff']) < Math.abs(current_temp)) {
                    season_metrics['max_temp_diff'] = Math.round(Math.abs(current_temp - historical_temp))
                    season_metrics['max_temp_period'] = period_names[period]
                }

                // TODO: What if one model says above freezing and the other doesn't?
                // Check for changes in seasonal freezing threshold from historical values
                if (unit_type == "metric" && historical_temp < 0 && current_temp > 0 ||
                    unit_type == "imperial" && historical_temp < 32 && current_temp > 32) {
                      console.log("Historical temperature: " + historical_temp)
                      console.log("Current Temperature: " + current_temp)
                      season_metrics['above_freezing'] = true
                }
                
                
            })
          })
          console.log("In the " + season_metrics['season'] + ", the temperature is " + (season_metrics['temp_rising'] == true ? 'INCREASING' : 'DECREASING') + " the most in the period " + season_metrics['max_temp_period'] + " and by " + season_metrics['max_temp_diff'])
          return season_metrics
          
          // More questions to be answered: 

          // Are the precipitation values increasing or decreasing?
          // By the most in what period?

          // Check the difference between the models for large uncertainty
          
          
        }

        var annual_temp_rise = true
        var season_highest_temp_change = 0.0
        var season_period_highest_temp_change = "None"
        var season_with_highest_temp_change = "None"
        var above_freezing_seasons = []
        var seasonal_metrics = []
        seasons.forEach((season) => {
          var season_output = collect_seasonal_metrics(season)
          
          if (season_output['temp_rising'] == false) {
            annual_temp_rise = false
          }
          console.log(season_highest_temp_change < season_output['max_temp_diff'])
          if (season_highest_temp_change < season_output['max_temp_diff']) {
            console.log(season_output['max_temp_diff'])
            season_highest_temp_change = season_output['max_temp_diff']
            season_period_highest_temp_change = season_output['max_temp_period']
            season_with_highest_temp_change = season_output['season']
          }

          if (season_output['above_freezing'] == true) {
            above_freezing_seasons.push(season_output['season'])
          }

          seasonal_metrics.push(season_output)
        })
        console.log("In " + place + ", " + (annual_temp_rise ? "annual" : season_with_highest_temp_change) + " temperatures are increasing.")
        console.log(season_with_highest_temp_change + " temperatures are increasing the most at " + season_highest_temp_change + units + " through the end of " + season_period_highest_temp_change.slice(5) + ".")
        if (above_freezing_seasons.length > 0) {
          console.log("In " + above_freezing_seasons.join(" and ").toLowerCase() + ", the average temperature may be above freezing in the future.")
        }
      }
    }
  }
</script>