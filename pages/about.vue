<template>
  <div>
    <HeaderBlock
      title="About"
      blurb="We&rsquo;ve made climate model projections for Alaska and western Canada easier to understand"
    />
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h2 class="title is-3 mt-5">
          What&rsquo;s in a Northern Climate Report?
        </h2>
        <div class="content is-size-5">
          <p>
            See stories and graphics that show how your part of the North may
            change over time. Use these to better understand and reduce risk,
            plan infrastructure, manage natural resources, and communicate
            change. You can also download data.
          </p>
        </div>
        <h2 class="title is-3 mt-6">How is this region changing?</h2>
        <div class="content is-size-5">
          <p>
            <strong>Temperatures are rising.</strong> Earlier springs, warmer
            summers, later autumns, and less severe winters are changing the mix
            of species on the Northern landscape.
          </p>
          <p>
            <strong>Permafrost is thawing.</strong> This alters surface drainage
            and increases possible rooting depths, yielding ecological shifts.
          </p>
          <p>
            <strong>Wildfires are more frequent.</strong> More early-succession
            and fewer late-succession vegetation species appear across
            landscapes.
          </p>
        </div>
        <h2 class="title is-3 mt-5">
          Best practices for using climate projections
        </h2>
        <div class="content is-size-5">
          <p>
            <strong>Think broadly.</strong> Climate projections are most
            reliable when averaged across time or space because daily variations
            are &ldquo;smoothed out.&rdquo; Examples: &ldquo;projected average
            of 30 years of winter precipitation for Bethel, Alaska&rdquo; or
            &ldquo;projected hottest temperature for the north coast of
            Alaska.&rdquo;
          </p>

          <p>
            <strong>What seems most likely?</strong> The climate we will
            experience will not look exactly like any one projection, but it
            will look like a lot of them. So, plan for the likely range of
            climates, impacts, and risks for the time frame and region
            you&rsquo;re working with.
          </p>

          <article class="message is-info">
            <div class="message-header">
              <p>Pro tip!</p>
            </div>
            <div class="message-body">
              Projections are always improving, but don&rsquo;t wait for a
              better one&mdash;you&rsquo;ll always be waiting, and the costs of
              waiting will increase. Instead, plan for the range of historical
              variability plus the range of climates described by a less warm
              (none show cooling!) model under a lower emissions scenario.
            </div>
          </article>
        </div>

        <h2 class="title is-3 mt-5">Best practices, illustrated</h2>
        <figure class="image">
          <img src="~/assets/images/best-practices-image.jpg" />
        </figure>
        <div class="content is-size-5">
          <p>
            These models provide a range that brackets average outputs across
            all CMIP5 models, and also perform well in Northern regions.
          </p>

          <ul>
            <li>
              <strong>Use multiple decades and historical comparisons.</strong>
              Longer-term averages resist model variability and natural
              variations. Compare a future (like 2070&ndash;2099) to a
              historical reference (like 1981&ndash;2010)&mdash;the later the
              reference, the more climate change is already a part of it!
            </li>
            <li>
              <strong>Choose a large area.</strong> Large areas, such as
              watersheds or planning units, are less affected by local
              variations in elevation, vegetation, etc. than small areas. Use
              multiple emissions scenarios. Humans are unpredictable, so pick at
              least two scenarios that bracket the likely range, unless you only
              want the &ldquo;best&rdquo; or &ldquo;worst&rdquo; case. RCP 4.5
              and RCP 8.5 are good choices.
            </li>
            <li>
              <strong>Use multiple models and/or an average.</strong> All models
              are plausible, if not equally likely. Use several models if the
              full range of possibilities is important to your work. Use a model
              average if you&rsquo;re more interested in the most likely
              outputs.
            </li>
            <li>
              <strong>Include medium-term and longer-term futures.</strong> A
              comprehensive assessment would consider a historical, a mid-21st
              century future, and a late-21st century future. The two futures
              should each have a high, low, and middle range, with multiple
              models and multiple emission scenarios in each future window.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import HeaderBlock from '~/components/HeaderBlock'

export default {
  components: {
    HeaderBlock,
  },
}
</script>
