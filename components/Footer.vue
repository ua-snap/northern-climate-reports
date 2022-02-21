<template>
  <footer class="footer">
    <div class="container">
      <section class="section">
        <h3 class="title is-4">Learn more about this tool</h3>
        <p>
          <nuxt-link :to="{ name: 'about' }"
            >Why this tool matters, plus overviews of climate change in the
            North and climate modeling</nuxt-link
          >
        </p>
        <h3 class="title is-4">Learn more about the data</h3>
        <p>
          <nuxt-link :to="{ name: 'data' }">Data sources</nuxt-link
          >&nbsp;&#8226;&nbsp;<a href="https://earthmaps.io">Data API</a>
        </p>
        <h3 class="title is-4">Questions? Comments? Get in touch.</h3>
        <p>
          <a href="mailto:uaf-snap-data-tools@alaska.edu"
            >uaf-snap-data-tools@alaska.edu</a
          >
        </p>
      </section>
      <section class="section">
        <img src="~/assets/images/UAFLogo_A_black_horiz.svg" alt="UAF Logo" />

        <p>
          This tool was developed by the
          <a href="https://www.snap.uaf.edu/" title="👍"
            >Scenarios Network for Alaska + Arctic Planning</a
          >
          at the<br>
          <a href="https://uaf-iarc.org">International Arctic Research Center</a
          >.
        </p>

        <p>
          Funding provided by the
          <a href="https://akcasc.org"
            >Alaska Climate Adaptation Science Center</a
          >
          and the <br/><a href="https://www.usgs.gov">United States Geological Survey</a>.
        </p>
        <p>
          Please contact
          <a href="mailto:uaf-snap-data-tools@alaska.edu"
            >uaf-snap-data-tools@alaska.edu</a
          >
          if you have questions or would like to provide feedback for this tool.
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
          Copyright &copy; {{ year }} University of Alaska Fairbanks. All rights
          reserved.
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
  background-image: url('~/assets/images/footer-image_2000.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  text-align: center;
  padding-bottom: 10rem;

  h3 {
    margin: 1rem 0 0.5rem; padding: 0;
  }

  p {
    font-size: 115%;
    max-width: 58rem;
    margin: 0.5rem auto 1rem;
  }

  img {
    width: 17rem;
  }
}
</style>
