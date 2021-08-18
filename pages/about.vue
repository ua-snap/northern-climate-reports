<template>
  <section class="section">
    <div class="content-wrapper">
      <div class="content is-size-5">
        <h2 class="title is-3">What the tool does</h2>

        <p>
          This tool provides Climate Impact Reviews, which are text and graphic
          summaries of climate change impacts on vegetation and wildfire in
          Northern landscapes to enable better public understanding of local and
          regional change.
        </p>
        <p>
          Choose a location (Park, refuge, watershed, community, etc.) and see:
        </p>
        <ol>
          <li>
            <strong>A summary table of climate scenario averages</strong>,
            downloadable for easy insertion in proposals, reports, etc. For
            example, it could present
            <ol>
              <li>a 5-model mean (addresses model variability),</li>
              <li>deltas (difference between future and historical), or</li>
              <li>
                historical and future values for temperature and precipitation,
                by season, for 30 year windows (address natural climate
                variability), or by RCP (address emissions)
              </li>
            </ol>
          </li>
          <li>
            <strong>An option to explore the range across models</strong>. For
            example, see the range of T and P by GCM under a given time frame
            and scenario (like 2040-2069, RCP 8.5).
          </li>
          <li>
            <strong>Graphic of the 5 model mean</strong> (this will be smoother)
            with the 5 individual models bracketing it for historical and future
            time series of T and P, like in some of the sea ice or extremes
            tools.
          </li>
          <li>
            <strong
              >Graphic of derived variables mapped out for my location across
              elevation.</strong
            >
          </li>
        </ol>
        <h2 class="title is-3">
          Why we need easy&ndash;to&ndash;use decision&ndash;support tools for
          climate adaptation
        </h2>
        <p>
          Assessments of climate-change effects on ecosystem processes and
          services in the North are hindered by a lack of decision-support tools
          that can visualize possible future landscapes under different
          scenarios.
        </p>
        <p>
          Model output products are publicly available, but often in formats
          requiring considerable analytical expertise to access and process.
          Repackaging these outputs as Climate Impact Reviews moves relevant
          climate information out of archival storage and into management
          decision spaces—thus helping to gauge future fire hazard, reduce
          future wildfire risk, promote ecological resilience and wildlife
          habitat management.
        </p>
        <h2 class="title is-3">How climate models work</h2>
        <p>
          Climate models are simplified versions of reality that try to explain
          climatic processes with just the most necessary parts of the system.
          Their skill is evident when comparing observed and simulated
          historical climate&mdash;the models capture most of the main features
          of the climate known to have happened.
        </p>
        <p>
          The consequences of this simplification are smallest at planetary
          scales and largest at local scales, where other factors are simplified
          enough that there is uncertainty. As such, the way most models are
          run, the resulting climate is a projection given the factors included
          in the model, not a forecast with probabilities.
        </p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Global climate models AGREE</th>
              <th scope="col">Global climate models DISAGREE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                signs (increases or decreases) of changes in temperature and
                precipitation that eventually happen as a result of forcing
              </td>
              <td>sizes of changes and when they may happen</td>
            </tr>
            <tr>
              <td>general changes in seasonal cycles</td>
              <td>
                size of seasonal changes or extreme daily highs and lows that
                may occur with future dynamics
              </td>
            </tr>
            <tr>
              <td>temperature</td>
              <td>precipitation</td>
            </tr>
            <tr>
              <td>sizes of changes at the equator and high latitudes</td>
              <td>sizes of changes at midlatitudes</td>
            </tr>
          </tbody>
        </table>

        <h2 class="title is-3">
          Strengths and limitations of climate models, and where uncertainty
          lies
        </h2>
        <p>
          Between now and about 20&ndash;30 years from now, current climate
          change is the best predictor of the rate of change, but decadal
          climate variability is the largest source of uncertainty.
        </p>
        <p>
          Climate models don't simulate decadal variability very well, and the
          range of climate model differences in changes between now and 20–30
          years from now is thus not very big. So, we ADD in that range by
          considering the historical variability (and likely paleo variability
          too).
        </p>
        <p>
          How do we do that? We take historical decadal differences from the
          observed data and add that range to the decadal average projected
          change for the coming decades. For projections, limiting the influence
          of any variability that is simulated is important, so it’s best to
          average two or three decades.
        </p>
        <h2 class="title is-3">Climate models and climate scenarios</h2>
        <p>
          The future climate of a place is a product of the natural seasonal and
          annual climate, the natural climatic variability from year to year and
          decade to decade, and the factors that force changes in the long-term
          climate trends.
        </p>
        <p>
          Developing scenarios of plausible future climate at regional to local
          scales requires the use of global climate models (GCMs) because the
          processes that drive local climate range in scale from planetary to
          local.
        </p>
        <p>To start to run a climate model, one feeds it data on:</p>
        <ul>
          <li>initial climate conditions</li>
          <li>
            &ldquo;forcings&rdquo; such as atmospheric greenhouse gas, solar and
            volcanic variability, etc.
          </li>
          <li>ocean and atmosphere variability</li>
          <li>land surface conditions</li>
          <li>feedbacks like the carbon cycle, etc.</li>
        </ul>
        <p>
          &hellip;to calculate the way that global climate varies and changes.
          Climate models keep track of many parameters in a gridded model of
          Earth at spatial scales averaging about a degree of latitude and
          longitude (60&ndash;100+ miles on a side) and temporal scales that can
          be finer&ndash;than&ndash;daily.
        </p>
        <p>
          The end product&mdash;the climate they simulate&mdash;is therefore
          actually the statistics of coarsely simulated weather, such as the
          average of 30 years of winter precipitation for a grid cell.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
