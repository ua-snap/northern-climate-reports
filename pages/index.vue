<template>
  <div>
    <div class="container">
      <section class="section leader">
        <div class="content-wrapper">
          <div class="content is-size-4">
            <p>
              Three forms of heat-related phenomena—warming temperatures,
              thawing permafrost, and more fire—are driving landscape change in
              Northern ecosystems. This tool uses climate data to construct a
              variety of possible futures for a warming North.
            </p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content-wrapper">
          <h4 class="title is-size-4">What this tool does</h4>
          <div class="content is-size-5">
            <p>
              The Climate Impact Reviews provided by this tool are text and
              graphic summaries of climate change impacts on vegetation and
              wildfire in Northern landscapes. The goal of these reports is
              better public understanding of local and regional change.
            </p>
            <strong>Choose a location</strong> (Park, refuge, watershed,
            community, etc.) and see:
            <ul>
              <li>
                <strong>A summary table of climate scenario averages</strong>,
                downloadable for easy insertion in proposals, reports, etc.
                Examples include:
                <ol>
                  <li>a 5-model mean (addresses model variability)</li>
                  <li>deltas (difference between future and historical)</li>
                  <li>
                    historical and future values for temperature and
                    precipitation, by season, for 30 year windows (these address
                    natural climate variability), or by RCP (these address
                    emissions)
                  </li>
                </ol>
              </li>
              <li>
                <strong>An option to explore the range across models</strong>.
                See the range of temperature and precipitation by climate model
                under a given time frame and scenario (e.g., 2040-2069, RCP
                8.5).
              </li>
              <li>
                <strong>Graphic of the 5-model average</strong>, with the 5
                individual models bracketing it for historical and future time
                series of temperature and precipitation.
              </li>
              <li>
                <strong
                  >Graphic of derived variables mapped out for your location
                  across elevation.</strong
                >
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <!--
      Place picker / map / report is all wrapped up below.
      This needs to be outside of any `container` or `section` wrappers.
    -->
    <App></App>
  </div>
</template>

<style type="scss" scoped>
.leader {
  margin-top: 3.5rem;
  font-weight: 600;
}
</style>

<script>
import App from '~/components/App'

export default {
  name: 'HomePage',
  layout: 'home',
  components: {
    App,
  },
}
</script>
