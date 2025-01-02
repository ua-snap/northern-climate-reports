<template>
  <div>
    <HeaderBlock
      blurb="A changing climate is altering Northern landscapes.
      <br class='is-hidden-touch' />
      Explore these changes with easy-to-understand climate model projections."
    />

    <noscript>
      <div class="container is-fluid">
        <section class="section">
          <div class="content is-size-5" style="max-width: 65rem">
            <h3 class="title is-3">
              ⚠️ This application requires JavaScript to be enabled.
            </h3>
            <p>
              This tool is designed to provide streamlined access to climate
              data for Alaska and parts of Canada.
            </p>
            <ul>
              <li>
                CMIP5 temperature and precipitation, from 5 high-performing
                models in the Arctic and three emissions scenarios (RCP4.5, 6.0
                and 8.5).
              </li>
              <li>
                Climate indicators derived from temperature and precipitation,
                such as <em>wet days per year</em> or <em>deep winter days</em>.
              </li>
              <li>
                <strong>Hydrology</strong> and <strong>permafrost</strong> data,
                driven by CMIP5 model inputs
              </li>
              <li>
                <strong>Vegetation change</strong> and
                <strong>flammability</strong>, driven by CMIP5 model inputs,
                that can explain changes in wildfire regime across the state
              </li>
              <li>
                <strong>Protection from spruce beetles</strong>, driven by CMIP5
                climate model inputs
              </li>
            </ul>

            <p>
              We&rsquo;re sorry! This tool does not work without JavaScript
              enabled.
            </p>
            <p>
              Please email us at
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >
              if we can help you access this content.
            </p>
          </div>
        </section>
      </div>
    </noscript>

    <!--
      Place picker / map / report is all wrapped up below in App.
      This needs to be outside of any `container` or `section` wrappers.
    -->
    <App></App>
  </div>
</template>

<style type="scss" scoped>
.leader {
  line-height: 1.5;
  font-size: 1.4rem;
  text-align: center;
  color: #787776;
  font-weight: 700;
  margin: 2rem auto;
}
</style>

<script>
import App from '~/components/App'

export default {
  name: 'HomePage',
  components: {
    App,
  },
}
</script>
