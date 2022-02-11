<template>
  <footer class="footer">
    <div class="container">
      <section class="section">
        <h3 class="subtitle is-3">Learn more about this tool and data</h3>
        <div class="content is-size-5">
          <p>
            Read more about
            <nuxt-link :to="{ name: 'about' }"
              >why this tool matters, and about climate models and
              RCPs</nuxt-link
            >. Find out
            <nuxt-link :to="{ name: 'data' }"
              >what data is used in this tool, and how to access it</nuxt-link
            >. Questions? Email us at
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >uaf-snap-data-tools@alaska.edu</a
            >.
          </p>
        </div>
      </section>
      <hr/>
      <section class="section">
        <div class="columns">
          <div class="logo column is-one-fifth">
            <img src="~/assets/images/UAF.svg" alt="UAF Logo" />
          </div>
          <div class="column is-four-fifths">
            <p>
              This tool was developed by the
              <a href="https://www.snap.uaf.edu/" title="👍"
                >Scenarios Network for Alaska + Arctic Planning</a
              >
              at the
              <a href="https://uaf-iarc.org"
                >International Arctic Research Center</a
              >.
            </p>

            <p>
              Funding provided by the
              <a href="https://akcasc.org"
                >Alaska Climate Adaptation Science Center</a
              >
              and the <a href="https://www.usgs.gov">U.S. Geological Survey</a>.
            </p>
            <p>
              Please contact
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >
              if you have questions or would like to provide feedback for this
              tool.
              <a href="https://uaf-snap.org/web-tools/"
                >Visit the SNAP Climate + Weather Tools page</a
              >
              to see our full suite of interactive web tools.
            </p>
            <p>
              Data available through this tool are subject to the
              <a href="https://creativecommons.org/licenses/by/4.0/"
                >Creative Commons Attribution 4.0</a
              >
              license.
            </p>
            <p>
              Copyright &copy; {{ year }} University of Alaska Fairbanks. All
              rights reserved.
            </p>
            <p>
              UA is an AA/EO employer and educational institution and prohibits
              illegal discrimination against any individual.
              <a href="https://www.alaska.edu/nondiscrimination/"
                >Statement of Nondiscrimination</a
              >
              and
              <a
                href="https://www.alaska.edu/records/records/compliance/gdpr/ua-privacy-statement/"
                >Privacy Statement</a
              >
            </p>
          </div>
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.4);

  .logo {
    text-align: center;
    img {
      position: relative;
      top: 1.25rem;
      width: 75%;
      max-width: 40vw;
    }
  }

  .columns p {
    margin: 1rem;
  }
}
</style>
