<template>
  <footer class="footer">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="content is-size-5">
          <img src="~/assets/images/UAFLogo_A_black_horiz.svg" alt="UAF Logo" />

          <p>
            Developed by the
            <a href="https://www.snap.uaf.edu/" title="🥦🥦🥦"
              >Scenarios Network for Alaska + Arctic Planning</a
            >
            at the
            <a href="https://uaf-iarc.org"
              >International Arctic Research Center</a
            >. <strong>Contact us</strong> at
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >uaf-snap-data-tools@alaska.edu</a
            >.
          </p>

          <p>
            Funding was provided by the
            <a href="https://akcasc.org"
              >Alaska Climate Adaptation Science Center</a
            >
            and the
            <a
              href="https://www.usgs.gov/programs/climate-adaptation-science-centers"
              >United States Geological Survey</a
            >.
          </p>
          <p>
            Data available through this tool are subject to the
            <a href="https://creativecommons.org/licenses/by/4.0/"
              >Creative Commons Attribution 4.0</a
            >
            license. Please contact
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >uaf&ndash;snap&ndash;data&ndash;tools@alaska.edu</a
            >
            with questions or comments.
            <a href="https://uaf-snap.org">Visit the SNAP website</a>
            to see all of our climate tools.
          </p>
          <p>
            UA is committed to providing accessible websites.
            <a href="https://www.alaska.edu/webaccessibility/"
              >Learn more about UA's notice of web accessibility.</a
            >
            If we can help you access this website’s content,
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >please email us at uaf-snap-data-tools@alaska.edu</a
            >.
          </p>
          <p>
            Copyright &copy; {{ year }} University of Alaska Fairbanks. All
            rights reserved.
            <br />
            UA is an affirmative action / equal opportunity employer,
            educational institution and provider and prohibits illegal
            discrimination against any individual.
            <br />
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
  background-image: url('~/assets/images/footer-image_2000.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  text-align: center;
  padding-bottom: 14rem;
  border-top: 0.8rem solid #5a4f72;
  border-bottom: 3rem solid #6e30f5;
  color: #5a4f72;

  img {
    width: 17rem;
  }
}
</style>
