<template>
	<div class="text-wrapper">
		<div id="qualitative-text"> 
      <h4 class="subtitle is-4">
			Qualitative Information
      </h4>
      <div class="content is-size-5">
        <ul class="place" v-html="generateText()" />
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
.place {
  ::v-deep .watershed {
		color: #888;
		font-weight: 800;
  }
}
</style>
<script>
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
      // Generate Qualitative Text
      // Input: None. (Uses reportData, place, and units properties)
      // Output: Text string containing HTML list items of processed seasonal metrics.
      generateText: function () {
        let reportData = this.reportData

        if (!reportData) {
          return
        }

        let path = this.$route.path

        let place = this.place

        if (!place) {
          return
        }

        let seasons = ['MAM', 'JJA', 'SON', 'DJF']
        let season_names = {'DJF': 'Winter', 'MAM': 'Spring', 'JJA': 'Summer', 'SON': 'Fall'}
        let periods = ['2040_2070', '2070_2100']
        let rcps = ['rcp45', 'rcp85']
        
        let unit_type = this.units
        let units = this.units == 'metric' ? 'ºC' : 'ºF'

        // Subfunction - collect_seasonal_metrics
        // Input: season - Season to collect metrics for. Listed above as constant seasons.
        // Output: season_metrics - JSON object containing metrics about the given season.
        function collect_seasonal_metrics(season) {

          let historical_temp = Math.round(Number(reportData['1910-2009'][season]['CRU-TS31']['CRU_historical']['tas']))
          let historical_precip = Number(reportData['1910-2009'][season]['CRU-TS31']['CRU_historical']['pr'])
          var season_metrics = {'season': season_names[season], 'max_temp_diff': 0, 'max_precip_diff': 0, 'precip_percent_change': 0, 'above_freezing': false}
          
          periods.forEach((period) => {
            rcps.forEach((rcp) => {

              // Take an average of both temperature and precipitation for the same season and RCP from both models.
              // Ensure the values are numbers before attempting to use the Math library on them.
              let temperature_average = Math.round((Number(reportData[period][season]['MRI-CGCM3'][rcp]['tas']) + Number(reportData[period][season]['CCSM4'][rcp]['tas'])) / 2)
              let precip_average = (Number(reportData[period][season]['MRI-CGCM3'][rcp]['pr']) + Number(reportData[period][season]['CCSM4'][rcp]['pr'])) / 2
              
              // If the maximum temperature difference is less than the current temperature difference,
              // set the new value as the greatest seasonal temperature difference.
              if (season_metrics['max_temp_diff'] < (temperature_average - historical_temp)) {
                season_metrics['max_temp_diff'] = temperature_average - historical_temp
              }

              // If the maximum precipitation difference is less than the current precipitation difference,
              // set the new value as the greatest seasonal precipitation difference and compute new
              // percentage changed stored as a rounded integer.
              if (season_metrics['max_precip_diff'] < precip_average - historical_precip) {
                season_metrics['max_precip_diff'] = (precip_average - historical_precip).toFixed(2)
                season_metrics['precip_percent_change'] = Math.round(((precip_average / historical_precip) * 100) - 100)
              }

              // We set this season to above freezing if one of the modeled averages is above freezing
              // while the historical value for temperature is below freezing.
              if (unit_type == "metric" && historical_temp < 0 && temperature_average > 0 ||
                  unit_type == "imperial" && historical_temp < 32 && temperature_average > 32) {
                    season_metrics['above_freezing'] = true
              }     
            })
          })
          
          return season_metrics     
        }

        // Subfunction: Generate annual metrics HTML string
        // Input: None. (Uses constant seasons)
        // Output: A string containing HTML for a linked list of all
        //         annual metrics of importance.
        function generate_annual_metrics_html() {

          var annual_temperature_average = 0
          var annual_highest_temp_change = 0
          var season_with_highest_temp_change = "None"
          var annual_highest_precip_percent_change = 0
          var season_with_highest_precip_change = "None"
          var above_freezing_seasons = []

          seasons.forEach((season) => {
            var season_output = collect_seasonal_metrics(season)
            
            // Collect highest seasonal temperature averages to compute annual average later.
            annual_temperature_average = annual_temperature_average + season_output['max_temp_diff']

            // Check if this temperature difference is the highest out of all the seasons thus far.
            if (annual_highest_temp_change < season_output['max_temp_diff']) {
              annual_highest_temp_change = season_output['max_temp_diff']
              season_with_highest_temp_change = season_output['season']
            }

            // Check if this prepitation change is the highest out of all the seasons thus far.
            if (annual_highest_precip_percent_change < season_output['precip_percent_change']) {
              annual_highest_precip_percent_change = season_output['precip_percent_change']
              season_with_highest_precip_change = season_output['season']
            }

            // If a season was marked as being above freezing when historically below freezing,
            // push it onto an array of seasons.
            if (season_output['above_freezing'] == true) {
              above_freezing_seasons.push(season_output['season'])
            }

          })

          // Average value against the 4 seasons included.
          annual_temperature_average = Math.round(annual_temperature_average / 4)
          
          var returned_string = ""

          if (path.includes("community")) {
            returned_string += "<li>In <b>" + place + "</b>"
          } else if (path.includes("huc")) {
            returned_string += "<li>In the <b>" + place + "</b>"
          } else {
            returned_string += "<li>At <b>" + place + "</b>"    
          }
          // Create the returned string using the values from the loop above.
          returned_string += ", average annual temperatures are likely to increase by up to <b>" + annual_temperature_average + units + "</b> by the end of the century.</li>"
          returned_string += "<li><b>" + season_with_highest_temp_change + "</b> temperatures are increasing the most (<b>+" + annual_highest_temp_change + units + "</b>).</li>"
          
          // If any season is marked as above freezing in the future when historically below freezing,
          // expand those values out to be added as an additional list item.
          if (above_freezing_seasons.length > 0) {

            // If less than 3 seasons are marked as now above freezing, just join them with an AND
            if (above_freezing_seasons.length < 3) {
              returned_string += "<b><li>" + above_freezing_seasons.join(" and ") + "</b> may transition from below freezing to <b>above freezing</b> in the future.</li>"
            } else {
              // Pop off the last season to be a special case.
              let last_season = above_freezing_seasons.pop()

              // Join the other seasons by commas and the last season by an AND.
              returned_string += "<b><li>" + above_freezing_seasons.join(", ") + ", and " + last_season + "</b> may transition from below freezing to <b>above freezing</b> in the future.</li>"
            }
          }
          returned_string += "<li>Models have high uncertainty with regard to precipitation, but <b>" + season_with_highest_precip_change + "</b> is likely to get wetter (<b>+" + annual_highest_precip_percent_change + "%</b>).</li>"
        
          return returned_string

        }

        return generate_annual_metrics_html()
      }
    }
  }
</script>