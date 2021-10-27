<template>
	<div class="text-wrapper">
		<div id="qualitative-text"> 
      <h4 class="subtitle is-4">
			Qualitative Information
      </h4>
      <div class="content is-size-5">
        <ul v-html="generateText()" />
      </div>
    </div>
	</div>
</template>
<style lang="scss" scoped>
#qualitative-text ul {
  list-style-type: circle;
}
.text-wrapper {
  padding-top: 2rem;
	padding-bottom: 2rem;
}
</style>
<script>
  import _ from 'lodash'
  export default {
    name: 'QualitativeText',
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

        let seasons = ['MAM', 'JJA', 'SON', 'DJF']
        let season_names = {'DJF': 'Winter', 'MAM': 'Spring', 'JJA': 'Summer', 'SON': 'Fall'}
        let periods = ['2040_2070', '2070_2100']
        let rcps = ['rcp45', 'rcp85']
        
        let unit_type = this.units
        let units = this.units == 'metric' ? 'ºC' : 'ºF'
        function collect_seasonal_metrics(season) {

          let historical_temp = Math.round(reportData['1910-2009'][season]['CRU-TS31']['CRU_historical']['tas'])
          let historical_precip = reportData['1910-2009'][season]['CRU-TS31']['CRU_historical']['pr']
          var season_metrics = {'season': season_names[season], 'max_temp_diff': 0, 'max_precip_diff': 0, 'precip_percent_change': 0, 'above_freezing': false, 'historical_temp': historical_temp}
          
          
          periods.forEach((period) => {
            rcps.forEach((rcp) => {
              console.log(season_names[season] + " " + period + " " + rcp)
              let temperature_average = Math.round((reportData[period][season]['MRI-CGCM3'][rcp]['tas'] + reportData[period][season]['CCSM4'][rcp]['tas']) / 2)
              let precip_average = Math.round((reportData[period][season]['MRI-CGCM3'][rcp]['pr'] + reportData[period][season]['CCSM4'][rcp]['pr']) / 2)
                console.log(season_names[season] + " Modeled Average Temperature: " + temperature_average)
                console.log(season_names[season] + " Historical Average Temperature: " + historical_temp)
                console.log("Seasonal difference: " + (temperature_average - historical_temp))
                if (Math.abs(season_metrics['max_temp_diff']) < Math.abs(temperature_average)) {
                    season_metrics['max_temp_diff'] = temperature_average - historical_temp
                }

                if (season_metrics['max_precip_diff'] < precip_average) {
                  season_metrics['max_precip_diff'] = Math.round(precip_average)
                  season_metrics['precip_percent_change'] = Math.round(((precip_average / historical_precip) * 100) - 100)
                }

                if (unit_type == "metric" && historical_temp < 0 && temperature_average > 0 ||
                    unit_type == "imperial" && historical_temp < 32 && temperature_average > 32) {
                      season_metrics['above_freezing'] = true
                }     
            })
          })
          
          return season_metrics     
        }

        function generate_annual_output() {

          var annual_temperature_average = 0
          var historical_temperature_average = 0
          var annual_highest_temp_change = 0
          var season_with_highest_temp_change = "None"
          var annual_highest_precip_percent_change = 0
          var season_with_highest_precip_change = "None"
          var above_freezing_seasons = []
          var seasonal_metrics = []
          seasons.forEach((season) => {
            var season_output = collect_seasonal_metrics(season)
            
            annual_temperature_average = annual_temperature_average + season_output['max_temp_diff']
            //console.log(season_output['season'] + " modeled: " + annual_temperature_average)
            historical_temperature_average = historical_temperature_average + season_output['historical_temp']
            //console.log(season_output['season'] + " historical: " + historical_temperature_average)
            //console.log("Higest temp change: " + annual_highest_temp_change)
            //console.log("Test season temp: " + season_output['max_temp_diff'])
            //console.log(annual_highest_temp_change < season_output['max_temp_diff'])
            if (annual_highest_temp_change < season_output['max_temp_diff']) {
              //console.log("Temperatue change: " + season_output['max_temp_diff'])
              annual_highest_temp_change = season_output['max_temp_diff']
              season_with_highest_temp_change = season_output['season']
            }

            if (annual_highest_precip_percent_change < season_output['precip_percent_change']) {
              //console.log("Precip change: " + season_output['precip_percent_change'] + "%")
              annual_highest_precip_percent_change = season_output['precip_percent_change']
              season_with_highest_precip_change = season_output['season']
            }

            if (season_output['above_freezing'] == true) {
              above_freezing_seasons.push(season_output['season'])
            }

            seasonal_metrics.push(season_output)
          })

          // Average value against the 4 seasons included.
          annual_temperature_average = annual_temperature_average / 4
          historical_temperature_average = historical_temperature_average / 4
          console.log("Annual modeled: " + annual_temperature_average)
          console.log("Annual historical: " + historical_temperature_average)
          let annual_temperature_diff = annual_temperature_average
          var returned_string = "<li>In <b>" + place + "</b>, annual temperatures are likely to increase by up to <b>" + annual_temperature_diff + units + "</b> by the end of the century.</li>"
          returned_string += "<li><b>" + season_with_highest_temp_change + "</b> temperatures are increasing the most (<b>+" + annual_highest_temp_change + units + "</b>). "
          if (above_freezing_seasons.length > 0) {
            returned_string += "<b>" + above_freezing_seasons.join(" and ") + "</b> may transition from below freezing to <b>above freezing</b> in the future."
          }
          returned_string += "</li><li>Models have high uncertainty with regard to precipitation, but <b>" + season_with_highest_precip_change + "</b> is likely to get wetter (<b>+" + annual_highest_precip_percent_change + "%</b>).</li>"
        
          return returned_string

        }

        return generate_annual_output()
      }
    }
  }
</script>